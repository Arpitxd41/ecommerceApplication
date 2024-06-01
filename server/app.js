require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectToDB = require('./config/db.js');
const userRouter = require('./routes/route.js');
const runSeeder = require('./seeder/seeder.js');

const app = express();

const corsOptions = {
    origin: [process.env.CLIENT_ROUTE_PRODUCTION, process.env.CLIENT_ROUTE_DEVELOPMENT],
    methods: 'GET,PUT,POST,DELETE,PATCH',
    credentials: true,
    optionsSuccessStatus: 204,
    allowHeaders: '*',
};


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Router
app.use(userRouter);

module.exports = app;

connectToDB(async () => {
    await runSeeder();
    const server = require('./server.js');
    server.start();
});
