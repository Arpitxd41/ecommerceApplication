require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/db.js');
const userRouter = require('./routes/route.js');

const app = express();

const corsOptions = {
    origin: 'https://localhost:3000',
    methods: 'GET,PUT,POST,DELETE,PATCH',
    credentials: true,
    optionsSuccessStatus: 204,
    allowHeaders: '*',
};

// middleware  
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));

// ROUTER
app.use(userRouter);

connectToDB();

module.exports = app;