const cartModel = require('../models/cartModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getUserCart = async (req, res) => {
  try {
    const userId = req.params; // Extract userId directly
    console.log('The USER ID RECEIVED = ', userId);

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid User Id format' });
    }

    const userCart = await cartModel.findOne({ user: new mongoose.Types.ObjectId(userId) });
    console.log('The USER CART RECEIVED', userCart);

    if (!userCart) {
      return res.status(404).json({ message: 'User cart not found!' });
    }

    res.status(200).json(userCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productId, productQuantity } = req.body;

    const existingCart = await cartModel.findOne({ user: userId });

    if (existingCart && existingCart.cartItems.length > 0) {
      const updatedCart = await cartModel.findOneAndUpdate(
        { user: userId },
        {
          $push: {
            cartItems: {
              product: productId,
              quantity: productQuantity || 1,
            },
          },
        },
        { new: true }
      ).populate('cartItems.product');

      res.status(200).json(updatedCart);
    } else {
      // Case: Cart items are empty or cart doesn't exist
      const newCart = await cartModel.findOneAndUpdate(
        { user: userId },
        {
          $set: {
            cartItems: [{
              product: productId,
              quantity: productQuantity || 1,
            }],
          },
        },
        { new: true, upsert: true }
      ).populate('cartItems.product');

      res.status(200).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

    
    const removeFromCart = async (req, res) => {
      try {
        const userId = req.params.userId;
        const productId = req.params.productId;
    
        // Your logic to remove the specified product from the user's cart
        const updatedCart = await cartModel.findOneAndUpdate(
          { user: userId },
          { $pull: { cartItems: { product: productId } } },
          { new: true }
        ).populate('cartItems.product');
    
        res.status(200).json(updatedCart);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };
    
    const removeAllFromCart = async (req, res) => {
      try {
        const userId = req.params.userId;
    
        // Your logic to remove all products from the user's cart
        const updatedCart = await cartModel.findOneAndUpdate(
          { user: userId },
          { $set: { cartItems: [] } },
          { new: true }
        ).populate('cartItems.product');
    
        res.status(200).json(updatedCart);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };
    

module.exports = {
      getUserCart,
      addToCart,
      removeFromCart,
      removeAllFromCart,
}