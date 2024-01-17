const productModel = require('../models/productModel');

const getProductsById = async(req, res) => {
      try {
            const productId = req.params.productId;
            const product = await productModel.findById(productId);

            if (!product) {
              return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json(product);
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
      }
};

const cartModel = require('../models/cartModel');

const getUserCart = async (req, res) => {
      try {
            const userId = req.params.userId;
            const userCart = await cartModel.finOne({ user: userId }).populate('cartItems.product');

            if (!userCart) {
              return res.status(404).json({ message: 'User cart not found!' });
            }

            res.status(200).json(userCart);
      } catch (error) {
            console.error(error);
            res.status(404).json({ message: 'Internal Server Error' });
      }
};
const addToCart = async (req, res) => {
      try {
            const userId = req.params.userId;
            const { productId, productQuantity } = req.body;
            
            if (!mongoose.isValidObjectId(productId)) {
              return res.status(400).json({ message: 'Invalid product Id'});
            }

            const userCart = await userCart.findOneAndUpdate(
                  { user: userId },
                  {
                        $push: {
                              cartItems: {
                                    product: productId,
                                    quantity: quantity || 1,
                              },
                        },
                  },
                  { new: true, upsert: true },
            ).populate('cartItems.product');

            res.status(200).json(userCart);
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'});
      };
}

module.exports = { getProductsById, getUserCart, addToCart };
