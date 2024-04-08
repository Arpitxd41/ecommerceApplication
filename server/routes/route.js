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
router.get('/getuser/:id', getUser);
router.put('/edituser/:id', editUser);
router.put('/addaddress/:id', addAddress)
router.get('/getallusers', getAllUsers);
router.put('/edituser/:id', editUser);
router.put('/forgotpassword/:id', forgotPassword);
router.delete('/deleteuser/:id', deleteUser);

// READ ROUTES:
router.get('/products', getAllProducts);
router.get('/product/:id', getProductsById);

// USER ROUTES:
router.get('/user/cart/:userId', getUserCart);
router.post('/user/cart/add/:userId/:productNumber', addToCart);
router.put('/user/cart/update/:userId/:productNumber', updateCartItemQuantity);
router.put('/user/cart/selectall/:userId', selectAllCartItems);
router.get('/user/cart/:userId/:productNumber', getCartProductDetails);
router.delete('/user/cart/remove/:userId/:productNumber', removeFromCart);
router.delete('/user/cart/remove/:userId', removeAllFromCart);

// PAYMENT ROUTES :
router.get('/user/getorder/:userId', getOrder);
router.post('/user/order/:userId', order);
router.post('/verify', verify);


module.exports = router;