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

app.get('/products', async (req, res) => {
  try {
    let apiUrl = 'https://dummyjson.com/products';

    if (req.query.category) {
      apiUrl = `https://dummyjson.com/products/category/${req.query.category}`;
    }

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

connectToDB();

module.exports = app;