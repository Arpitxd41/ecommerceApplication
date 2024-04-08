const cartModel = require('../models/cartModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    let userCart = await cartModel.findOne({ user: userId });
    if (!userCart) {
      userCart = new cartModel({
        user: userId,
        cartItems: [],
      })
      await userCart.save();
      console.log('New userCart created :', userCart);
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
    const productNumber = Number(req.params.productNumber);
    const quantity = Number(req.body.quantity);
    const existingCart = await cartModel.findOne({ user: userId });

    if (!userId || !productNumber) {
      return res.status(400).json({ message: 'Invalid User or Product Id format' });
    }

    if (existingCart) {
      const existingProduct = existingCart.cartItems.find(item => item.productNumber === productNumber);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        existingCart.cartItems.unshift({
          productNumber: productNumber,
          quantity: 1,
          checked: true
        });
      };
      const updatedCart = await existingCart.save();
      res.status(200).json(updatedCart);
    } else {
      const newCart = await cartModel.create({
        user: userId,
        cartItems: [{
          productNumber: productNumber,
          quantity: 1
        }]
      });
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
    const productNumber = Number(req.params.productNumber);
    const newQuantity = Number(req.body.quantity);
    const checked = req.body.checked;

    if (!userId || !productNumber) {
      return res.status(400).json({ message: 'Invalid User or Product Id format' });
    }

    const userCart = await cartModel.findOne({ user: userId });
    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItemToUpdate = userCart.cartItems.find(item => item.productNumber === productNumber);
    if (!cartItemToUpdate) {
      return res.status(404).json({ message: 'Product not found in the cart' });
    }

    cartItemToUpdate.quantity = newQuantity;
    cartItemToUpdate.checked = checked; // Update the checked status
    await userCart.save();
    res.status(200).json(userCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const selectAllCartItems = async (req, res) => {
  try {
    const userId = req.params.userId;
    const selectAll = req.body.selectAll;


    if (!userId) {
      return res.status(400).json({ message: 'Invalid User Id format' });
    }

    const userCart = await cartModel.findOne({ user: userId });
    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    userCart.cartItems.forEach(item => {
      item.checked = selectAll;
    });

    await userCart.save();
    res.status(200).json(userCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getCartProductDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productNumber = Number(req.params.productNumber);

    const userCart = await cartModel.findOne({ user: userId });
    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItem = userCart.cartItems.find(item => item.productNumber === productNumber);
    if (!cartItem) {
      return res.status(404).json({ message: '--------------Product not found in cart-------------' });
    }

    const productDetails = {
      productNumber: cartItem.productNumber,
      quantity: cartItem.quantity,
      checked: cartItem.checked // Include checked status in the response
    };

    res.status(200).json(productDetails);
  } catch (error) {
    console.error('Error fetching cart product details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productNumber = req.params.productNumber;
    const userCart = await cartModel.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const indexToRemove = userCart.cartItems.findIndex(item => item.productNumber.toString() ===productNumber.toString());

    if (indexToRemove === -1) {
      return res.status(500).json({ message: 'Product not found in the cart' });
    }
    userCart.cartItems.splice(indexToRemove, 1);
    await userCart.save();
    console.log(userCart.cartItems);
    res.status(200).json(userCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const removeAllFromCart = async (req, res) => {
  try {
    const userId = req.params.userId;

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
      selectAllCartItems,
      getCartProductDetails,
      removeFromCart,
      removeAllFromCart,
}