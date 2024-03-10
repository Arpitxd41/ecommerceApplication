require('dotenv').config();

const razorpay = require('razorpay');
const crypto = require('crypto');

const order = async(req, res) => {
      function randomString() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
            let uniqueString = '';
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                uniqueString += characters[randomIndex];
            }
            return uniqueString;
        }

      const amount = 5;
      const currency = 'INR';
      const options = {
            amount: (amount*100).toString(),
            currency: currency,
            receipt: randomString(),
      }

      try {
            const response = await razorpay.orders.create(options);
            console.log(response);
            res.send('ok');
      } catch (error) {
            console.error(error);
      }
}

const verify = async (req, res) => {
      try {
           const {
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature 
           } = req.body;
           const sign = razorpay_order_id + "|" + razorpay_payment_id;
           const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET).update(sign.toString()).digest('hex');

           if (razorpay_signature === expectedSign) {
                  return res.status(200).json({message: "Payment validity successful"});
           } else {
                  return res.status(400).json({message: "Invalidity signature sent!"});
           }
      } catch (error) {
            console.error(error);
            res.status(500).json({message: "internal server error"});
      }
}

module.exports = {
      order,
      verify,
};