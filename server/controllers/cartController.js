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
    const productNumber = Number(req.params.productNumber);
    const newQuantity = Number(req.body.quantity);
    const checked = req.body.checked; // Add this line to get the checkbox status

    console.log('Product ID received =>', productNumber);
    console.log('User ID received =>', userId);
    console.log('New quantity =>', newQuantity);
    console.log('Checked status =>', checked); // Log the checkbox status

    if (!userId || !productNumber) {
      return res.status(400).json({ message: 'Invalid User or Product Id format' });
    }

    const userCart = await cartModel.findOne({ user: userId });
    console.log('Users Cart from cart-buttons =>', userCart);
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
    const selectAll = req.body.selectAll; // Boolean value indicating whether to select all or deselect all

    console.log('User ID received for select all =>', userId);
    console.log('Select all status =>', selectAll); // Log the select all status

    if (!userId) {
      return res.status(400).json({ message: 'Invalid User Id format' });
    }

    const userCart = await cartModel.findOne({ user: userId });
    console.log('Users Cart for select all =>', userCart);
    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Update the checked status of all cart items
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
    console.log('User ID from cart-buttons', userId);
    console.log('Product Number from cart-buttons', productNumber);

    const userCart = await cartModel.findOne({ user: userId });
    console.log('Users Cart from cart-buttons', userCart);
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
      selectAllCartItems,
      getCartProductDetails,
      removeFromCart,
      removeAllFromCart,
}