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
//build a mongodb schema for the car here

//it needs to have these value names, but you can refer to data/seed.json because it needs to match that in order for the front end to call it.

//imgUrl
//carType
//carColor
//carBrand
//carPrice
