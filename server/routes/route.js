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
    getProducts,
    getCategoryProducts,
    getProductsById,
    getAllProducts,
    addProduct
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
router.get('/getuser/:userId', getUser);
router.put('/edituser/:userId', editUser);
router.put('/add_address/:userId', addAddress)
router.get('/getallusers', getAllUsers);
router.put('/edituser/:userId', editUser);
router.put('/forgotpassword/:userId', forgotPassword);
router.delete('/deleteuser/:userId', deleteUser);

router.post('/addnewproduct', addProduct);

// READ ROUTES:
router.get('/fetch_all_products', getProducts);
router.get('/all_products', getAllProducts);
router.get('/all_products/:category', getCategoryProducts);
router.get('/product/:productId', getProductsById);

// USER ROUTES:
router.get('/user/cart/:userId', getUserCart);
router.post('/user/cart/add/:userId/:productId', addToCart);
router.put('/user/cart/update/:userId/:productId', updateCartItemQuantity);
router.put('/user/cart/selectall/:userId', selectAllCartItems);
router.get('/user/cart/:userId/:productId', getCartProductDetails);
router.delete('/user/cart/remove/:userId/:productId', removeFromCart);
router.delete('/user/cart/remove/:userId', removeAllFromCart);

// PAYMENT ROUTES :
router.get('/user/getorder/:userId', getOrder);
router.post('/user/order/:userId', order);
router.post('/verify', verify);


module.exports = router;