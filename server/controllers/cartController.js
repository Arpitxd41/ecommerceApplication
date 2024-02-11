const cartModel = require('../models/cartModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('The USER ID RECEIVED = ', userId);

    const userCart = await cartModel.findOne({ user: userId });
    console.log(userId);

    if (!userCart) {
      userCart = new cartModel({
        user: userId,
        cartItems: [],
      })
      await userCart.save();
      console.log('New userCart created :', userCart);
    }
    console.log('The USER CART RECEIVED', userCart);
    // console.log('The USER PRODUCT NUMBER', productNumber);
    res.status(200).json(userCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productNumber = req.params.productNumber;
    const { productQuantity } = req.body;
    console.log('productNumber received ===', productNumber);

    const existingCart = await cartModel.findOne({ user: userId });

    if (existingCart && existingCart.cartItems.length > 0) {
      const updatedCart = await cartModel.findOneAndUpdate(
        { user: userId },
        {
          $push: {
            cartItems: {
              productNumber: productNumber,
              quantity: productQuantity,
            },
          },
        },
        { new: true }
      );

      res.status(200).json(updatedCart);
    } else {
      // Case: Cart items are empty or cart doesn't exist
      const newCart = await cartModel.findOneAndUpdate(
        { user: userId },
        {
          $set: {
            cartItems: [{
              productNumber: productNumber,
              quantity: productQuantity || 1,
            }],
          },
        },
        { new: true, upsert: true }
      ).populate('cartItems.product');

      console.log('This is the product number coming from productCart to controlller', productNumber);
      res.status(200).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productNumber = req.params.productNumber;
    console.log('Product ID received:', productNumber);

    const { newQuantity } = req.body;

    if (!userId || !productNumber) {
      return res.status(400).json({ message: 'Invalid User or Product Id format' });
    }

    const updatedCart = await cartModel.findOneAndUpdate(
      {
        user: new mongoose.Types.ObjectId(userId),
        'cartItems.productNumber': productNumber 
      },
      { $set: 
        { 
          'cartItems.$.quantity': newQuantity
        } 
      },
      {
        new: true
      }
    );

    console.log('Product ID received:', productNumber);

    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart or product not found' });
    }
    console.log('Product ID received:', productNumber);

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productNumber = req.params.productNumber;

    // Your logic to remove the specified product from the user's cart
    const updatedCart = await cartModel.findOneAndUpdate(
      {
        user: userId
      },
      { $pull: 
        { cartItems: 
          { 
            productNumber: productNumber
          } 
        } 
      },
      {
        new: true
      }
    );

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
      {
        user: userId
      },
      {
        $set: {
          cartItems: []
        }
      },
      {
        new: true
      }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
      getUserCart,
      addToCart,
      updateCartItemQuantity,
      removeFromCart,
      removeAllFromCart,
}