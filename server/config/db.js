// CONFIG

const mongoose = require("mongoose");

const connectToDB = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then((connect) => {
        console.log(`Successfully connected to DB : ${connect.connection.host}`);        
    })
    .catch((error) => {
        console.log(error.message);
        console.log('error in DB connection');        
        process.exit(1);        
    });
}

module.exports = connectToDB;