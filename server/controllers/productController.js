const productModel = require('../models/productModel');
const mongoose = require('mongoose');
const axios = require('axios');

// const fetchProducts = async () => {
//   try {
//     const apiUrl = 'https://dummyjson.com/products';
//     const response = await axios.get(apiUrl);
//     const products = response.data;

//     for (const product of products) {
//       await productModel.create({
//         productNumber: product.id,
//         title: product.title,
//         description: product.description,
//         brand: product.brand,
//         price: product.price,
//         thumbnail: product.thumbnail,
//       });
//     }

//     console.log('Products inserted into MongoDB!');
//   } catch (error) {
//     console.error('Error inserting products into MongoDB:', error.message);
//   }
// };
const getAllProducts = async (req, res) => {
  try {
    let apiUrl = 'https://dummyjson.com/products';

    if (req.query.category) {
      apiUrl = `https://dummyjson.com/products/category/${req.query.category}`;
    }
    // await insertProductsIntoDatabase();
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
    const productNumber = req.params.id;
    const product = await productModel.findById(productNumber);

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
  // fetchProducts,
};
