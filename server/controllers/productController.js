// const productModel = require('../models/productModel.js');
const mongoose = require('mongoose');
const axios = require('axios');
const ProductModel = require('../models/productModel.js');

const getProducts = async (req, res) => {
  try {
    const apiUrl = process.env.DUMMY_PRODUCTS; 
    const response = await axios.get(apiUrl);
    const products = response.data.products;
    
    for(let product of products) {
      const newProduct = new ProductModel({
          productId: product.id,
          title: product.title,
          description: product.description,
          discountPercentage: product.discountPercentage,
          price: product.price*45,
          rating: product.rating,
          brand: product.brand,
          images: product.images,
          thumbnail: '',
          category: product.category,
          thumbnail: product.thumbnail,
      });
  
      await newProduct.save();
    }
  } catch (error) {
    console.error('Error fetching and saving products:', error);
    res.status(500).json({
      error: 'Internal Server Error fetching product from dummy',
      message: error.message,
    });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();

    res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        products,
    });

    console.log('All Products retrieved');

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

const getCategoryProducts = async (req, res) => {
  try {
    const selectedCategory = req.params.category;
    console.log('selectedCategory', selectedCategory);
    
    const products = await ProductModel.find({category: selectedCategory});

    res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        products,
    });

    console.log('All Products retrieved');

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};


const getProductsById = async (req, res) => {
  try {
    const productId = req.params.productId;
    console.log('product id ------------', productId);
    
    // Validate the productId
    let product;
    if (mongoose.Types.ObjectId.isValid(productId)) {
      product = await ProductModel.findById(productId);
    } else {
      product = await ProductModel.findOne({ _id: productId });
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      product,
    });
    console.log(`Product retrieved: ${product.title}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addProduct = async(req, res) => {
  try {
    const productId = await getNextProductId();
    const newProductData = { productId: productId, ...req.body };
    console.log('new product data', newProductData);
    console.log('new product data', req.body);
    
    const newProduct = await ProductModel.create(newProductData);
    res.status(201).json(newProduct);
  } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getNextProductId = async(req, res) => {
  try {
    // Find the highest productId in the database
    const highestProduct = await ProductModel.findOne().sort({ productId: -1 }).limit(1);
    let nextProductId = 101; // Default value if there are no existing products

    if (highestProduct) {
      // If there are existing products, increment the highest productId by 1
      nextProductId = highestProduct.productId + 1;
    }

    return nextProductId;
  } catch (error) {
    console.error('Error getting next product id:', error);
    throw error;
  }
}

module.exports = {
  getProducts,
  getAllProducts,
  getCategoryProducts,
  getProductsById,
  addProduct,
};
