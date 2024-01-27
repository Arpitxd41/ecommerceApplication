const productModel = require('../models/productModel');
const mongoose = require('mongoose');
const axios = require('axios');

const getAllProducts = async (req, res) => {
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
      message: error.message,
    });
  }
};

const getProductsById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  getAllProducts,
  getProductsById,
  
};
