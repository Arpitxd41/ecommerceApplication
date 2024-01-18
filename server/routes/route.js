// URL PATH

const express = require("express");

// USER ROUTES
const {
    generateToken,
    register,
    login
} = require('../controllers/user'); // IMPORTING CONTROLLERS

const { 
    getProductsById,
    getUserCart,
    addToCart,
    getAllProducts,
    removeFromCart,
    removeAllFromCart
} = require('../controllers/product')

const router = express.Router();

// ACTUAL ROUTES:
router.get("/" , generateToken);
router.post("/register", register);
router.post("/login", login);

// READ ROUTES:
router.get('/products', getAllProducts);
router.get('/products/product:id', getProductsById);
router.get('/cart:userId', getUserCart);
router.post('/cart/:userId/add', addToCart);
router.delete('/cart/:userId/remove/:productId', removeFromCart);
router.delete('/cart/:userId/remove', removeAllFromCart)


module.exports = router;