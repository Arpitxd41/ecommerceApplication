
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectToDB = require('./config/db');
const userRouter = require('./routes/route');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

connectToDB();

app.use(userRouter);

module.exports = app;