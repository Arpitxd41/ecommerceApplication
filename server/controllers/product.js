const productModel = require('../models/productModel');
const cartModel = require('../models/cartModel');
const mongoose = require('mongoose');

const getAllProducts = async(req, res) => {
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
};

const getProductsById = async(req, res) => {
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

const getUserCart = async (req, res) => {
      try {
            const userId = req.params.userId;
            const userCart = await cartModel.finOne({ user: userId }).populate('cartItems.product');

            if (!userCart) {
              return res.status(404).json({ message: 'User cart not found!' });
            }

            res.status(200).json(userCart);
      } catch (error) {
            console.error(error);
            res.status(404).json({ message: 'Internal Server Error' });
      }
};
const addToCart = async (req, res) => {
      try {
            const userId = req.params.userId;
            const { productId, productQuantity } = req.body;
            
            if (!mongoose.isValidObjectId(productId)) {
              return res.status(400).json({ message: 'Invalid product Id'});
            }

            const userCart = await userCart.findOneAndUpdate(
                  { user: userId },
                  {
                        $push: {
                              cartItems: {
                                    product: productId,
                                    quantity: productQuantity || 1,
                              },
                        },
                  },
                  { new: true, upsert: true },
            ).populate('cartItems.product');

            res.status(200).json(userCart);
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'});
      };
}
const removeFromCart = async (req, res) => {
      try {
        const userId = req.params.userId;
        const productId = req.params.productId;
    
        // Your logic to remove the specified product from the user's cart
        const userCart = await cartModel.findOneAndUpdate(
          { user: userId },
          { $pull: { cartItems: { product: productId } } },
          { new: true }
        ).populate('cartItems.product');
    
        res.status(200).json(userCart);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};
    
const removeAllFromCart = async (req, res) => {
      try {
        const userId = req.params.userId;
    
        // Your logic to remove all products from the user's cart
        const userCart = await cartModel.findOneAndUpdate(
          { user: userId },
          { $set: { cartItems: [] } },
          { new: true }
        ).populate('cartItems.product');
    
        res.status(200).json(userCart);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};
    
module.exports = {
      getAllProducts,
      getProductsById,
      getUserCart,
      addToCart,
      removeFromCart,
      removeAllFromCart,
};
