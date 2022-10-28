let mongoose = require("mongoose");
const { router } = require("../config/app");

// create a model class
let Product = mongoose.Schema(
  {
    Productid: String,
    Productname: String,
    Description: String,
    Price: Number,
  },
  {
    collection: "products",
  }
);

module.exports = mongoose.model("Product", Product);
