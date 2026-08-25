require("dotenv").config();

const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected To MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err.message);
      process.exit(1);
    });
}


module.exports = 
    connectToDB
;
