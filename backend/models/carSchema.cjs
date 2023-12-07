const mongoose = require("mongoose");

//Define car schema
const carSchema = mongoose.Schema({
  imgUrl: { type: String },
  carType: { type: String },
  carColor: { type: String },
  carBrand: { type: String },
  carPrice: { type: Number },
});

//create and export
module.exports = mongoose.model("Car", carSchema);
