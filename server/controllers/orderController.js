const Razorpay = require('razorpay');
const crypto = require('crypto');
const orderModel = require('../models/orderModel.js');
const cartModel = require('../models/cartModel.js');

const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET
});
const order = async(req, res) => {
      function randomString() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let uniqueString = '';
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                uniqueString += characters[randomIndex];
            }
            return uniqueString;
        }

      const { userId, totalAmount, selectedProducts, selectedAddress } = req.body;

      const currency = 'INR';
      const options = {
            amount: (totalAmount * 100).toString(),
            currency: currency,
            receipt: randomString(),
      }

      try {
            const response = await razorpay.orders.create(options);
            console.log('response =>', response);

            const newOrder = new orderModel({
                  userId: userId,
                  orderId: response.id,
                  selectedProducts: selectedProducts,
                  selectedAddress: selectedAddress,
                  totalAmount: totalAmount,
                  orderDetails: [],
                  paymentDetails: []
            });
            
            await newOrder.save();
            
            return res.json({
                  id: response.id,
                  currency: response.currency,
                  amount: response.amount,
            })
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating order" });
      }
}

const verify = async (req, res) => {
      try {
        const secret = process.env.RAZORPAY_VERIFY;
    
        const shasum = crypto.createHmac('sha256', secret)
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest('hex')
    
        // console.log('something', digest, req.headers['x-razorpay-signature']);
        if (digest === req.headers['x-razorpay-signature']) {
          const { event, payload } = req.body;
    
          if (event === 'order.paid' && payload && payload.payment && payload.order) {
            const { payment, order } = payload;
            const paymentDetails = {
              event: event,
              paymentId: payment.entity.id,
              paymentAmount: payment.entity.amount,
              method: payment.entity.method,
            }
            const orderDetails = {
              orderId: order.entity.id,
              amountPaid: order.entity.amount_paid,
              receiptNumber: order.entity.receipt,
              orderStatus: order.entity.status,
              createdAt: order.entity.created_at,
            };

            const existingOrder = await orderModel.findOne({ orderId: orderDetails.orderId });
    
            if (existingOrder) {
              await orderModel.updateOne({ orderId: orderDetails.orderId }, { orderDetails, paymentDetails });
              console.log('-------Order details updated in the DB-----');

              const orderData = await grabOrder(orderDetails.orderId);
              console.log('Order data of existing order:', orderData);
              
              return res.json({ status: 'ok' }); 
            } else {
              return res.status(404).json({ success: false });
            }
          } else {
            return res.status(404).json({ success: false });
          }
          return;
        } else {
          return res.status(400).json({ success: false, message: 'Signature verification failed' });
        }
        return;
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
}

const grabOrder = async (receivedOrderId) => {
  try {
    const orderData = await orderModel.findOne({ orderId: receivedOrderId });
    console.log('order data:', orderData);
    const userId = orderData.userId;
    
    const userCart = await cartModel.findOne({ user: userId }).select('cartItems');
    console.log('userCart:', userCart);

    // Filter out checked items from the user's cart
    const updatedCartItems = userCart.cartItems.filter(item => !item.checked);

    // Update the user's cart in the database
    const updatedCart = await cartModel.findOneAndUpdate(
      { user: userId }, 
      { cartItems: updatedCartItems }, 
      { new: true }
    );
    console.log('User cart updated successfully.', updatedCart);

    return orderData;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

const getOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userOrders = await orderModel.find({ userId: userId });
    
    if (!userOrders || userOrders.length === 0) {
      return res.status(404).json({ error: 'No orders found for the user' });
    }
    
    return res.status(200).json(userOrders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
      order,
      verify,
      getOrder
};
