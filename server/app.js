require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectToDB = require('./config/db.js');
const userRouter = require('./routes/route.js');

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_ROUTE,
    methods: 'GET,PUT,POST,DELETE,PATCH',
    credentials: true,
    optionsSuccessStatus: 204,
    allowHeaders: '*',
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Router
app.use(userRouter);

module.exports = app;

connectToDB(() => {
    const server = require('./server.js');
    server.start();
});
