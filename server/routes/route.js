// URL PATH

const express = require("express");

// USER ROUTES
const {
    generateToken,
    register,
    login,
    getUser,
    getAllUsers,
    editUser,
    forgotPassword,
    deleteUser
} = require('../controllers/userController'); // IMPORTING CONTROLLERS

const { 
    getProductsById,
    getUserCart,
    addToCart,
    getAllProducts,
    removeFromCart,
    removeAllFromCart
} = require('../controllers/productController')

const router = express.Router();

// ACTUAL ROUTES:
router.get('/' , generateToken);
router.post('/register', register);
router.post('/login', login);
router.get('/getUser/:id', getUser);
router.get('/getAllUsers', getAllUsers);
router.put('/editUser/:id', editUser);
router.put('/forgotPassword/:id', forgotPassword);
router.delete('/deleteUser/:id', deleteUser);

// READ ROUTES:
router.get('/products', getAllProducts);
router.get('/product/:id', getProductsById);

router.get('/cart/:id', getUserCart);
router.post('/cart/add/product/:id', addToCart);
router.delete('/cart/remove/product/:id', removeFromCart);
router.delete('/cart/empty', removeAllFromCart)


module.exports = router;