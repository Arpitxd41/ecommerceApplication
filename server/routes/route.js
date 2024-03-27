// URL PATH

const express = require("express");

// USER ROUTES
const {
    generateToken,
    register,
    login,
    getUser,
    addAddress,
    getAllUsers,
    editUser,
    forgotPassword,
    deleteUser
} = require('../controllers/userController.js');

const { 
    getProductsById,
    getAllProducts,
} = require('../controllers/productController.js')

const {
    getUserCart,
    addToCart,
    updateCartItemQuantity,
    selectAllCartItems,
    getCartProductDetails,
    removeFromCart,
    removeAllFromCart
} = require('../controllers/cartController.js');

const {
    order,
    verify,
    getOrder
} = require('../controllers/orderController.js');

const router = express.Router();

// APP ROUTES:
router.get('/' , generateToken);
router.post('/register', register);
router.post('/login', login);
router.get('/getUser/:id', getUser);
router.put('/addAddress/:id', addAddress)
router.get('/getAllUsers', getAllUsers);
router.put('/editUser/:id', editUser);
router.put('/forgotPassword/:id', forgotPassword);
router.delete('/deleteUser/:id', deleteUser);

// READ ROUTES:
router.get('/products', getAllProducts);
router.get('/product/:id', getProductsById);

// USER ROUTES:
router.get('/user/:userId/cart', getUserCart);
router.post('/user/:userId/cart/add/:productNumber', addToCart);
router.put('/user/:userId/cart/update/:productNumber', updateCartItemQuantity);
router.put('/user/:userId/cart/selectAll', selectAllCartItems);
router.get('/user/:userId/cart/:productNumber', getCartProductDetails);
router.delete('/user/:userId/cart/remove/:productNumber', removeFromCart);
router.delete('/user/:userId/cart/remove', removeAllFromCart);
router.get('/user/:userId/getOrder', getOrder);

// PAYMENT ROUTES :
router.post('/user/:userId/order', order);
router.post('/verify', verify);


module.exports = router;