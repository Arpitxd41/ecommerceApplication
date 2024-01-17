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
    addToCart
} = require('../controllers/product')

const router = express.Router();

// ACTUAL ROUTES:
router.get("/" , generateToken);
router.post("/register", register);
router.post("/login", login);

// READ ROUTES:
router.get('/products/product:id', getProductsById);
router.get('/cart', getUserCart);
router.post('/addToCart', addToCart);


module.exports = router;