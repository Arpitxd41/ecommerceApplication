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
    getAllProducts,
} = require('../controllers/productController')

const {
    getUserCart,
    addToCart,
    updateCartItemQuantity,
    selectAllCartItems,
    getCartProductDetails,
    removeFromCart,
    removeAllFromCart
} = require('../controllers/cartController');

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

router.get('/user/:userId/cart', getUserCart);
router.post('/user/:userId/cart/add/:productNumber', addToCart);
router.put('/user/:userId/cart/update/:productNumber', updateCartItemQuantity);
router.put('/user/:userId/cart/selectAll', selectAllCartItems);
router.get('/user/:userId/cart/:productNumber', getCartProductDetails);
router.delete('/user/:userId/cart/remove/:productId', removeFromCart);
router.delete('/user/:userId/cart/remove', removeAllFromCart)


module.exports = router;