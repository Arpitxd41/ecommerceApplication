require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/db');
const userRouter = require('./routes/route');
const app = express();
const corsOptions = {
    origin: 'https://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

// middleware  
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use(userRouter);

connectToDB();

module.exports = app;