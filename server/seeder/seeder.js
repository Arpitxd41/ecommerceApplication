const userCart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const userModel = require("../models/userModel");

const usersInFile = require("./data/ecommerce.users.json");
const ordersInFile = require("./data/ecommerce.orders.json");
const productsInFile = require("./data/ecommerce.products.json");
const userCartsInFile = require("./data/ecommerce.userCarts.json");

/**
 * Enters test data to db if not already present
 * @returns void
 * @author @Arpitxd41
 */
async function runSeeder() {
      if(process.env.NODE_ENV === "production"){
            return;
      }

      console.info('Seeder run start');

      const usersInDB = await userModel.find();
      const productsInDB = await Product.find();
      const ordersInDB = await Order.find();
      const userCartsInDB = await userCart.find();

      if (usersInDB.length === 0) {
            await userModel.insertMany(usersInFile);
            console.info(`${usersInFile.length} users added`);
      }

      if (productsInDB.length === 0) {
            await Product.insertMany(productsInFile);
            console.info(`${productsInFile.length} products added`);
      }

      if (ordersInDB.length === 0) {
            await Order.insertMany(ordersInFile);
            console.info(`${ordersInFile.length} orders added`);
      }

      if (userCartsInDB.length === 0) {
            await userCart.insertMany(userCartsInFile);
            console.info(`${userCartsInFile.length} userCarts added`);
      }

      console.info('Seeder run complete');
}

module.exports = runSeeder;