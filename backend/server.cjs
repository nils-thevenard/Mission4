const cors = require("cors");
const express = require("express");
const landingRoute = require("./routes/landing.cjs");
const cardatabase = require("./routes/getDatabase.cjs");
const getrandom = require("./routes/getRandom.cjs");
const mongoose = require("mongoose");
const Car = require("./models/carSchema.cjs"); //import our carSchema

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());

app.get("/", landingRoute);
app.use("/getrandom", getrandom);
app.use("/cardatabase", cardatabase);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log(` http://localhost:${PORT}/`);
});

//map global promise to get rid of warning
mongoose.Promise = global.Promise;
// connect to the database
const db = mongoose.connect("mongodb://localhost:27017/mission4");

//function to add a car
const addCar = (car) => {
  Car.create(car).then((car) => {
    console.info("New car Added");
    mongoose.disconnect();
  });
};

// function to find a car
const findCar = (model) => {
  // make case insensitive
  const search = new RegExp(model, "i");
  // return the result of the find operation
  return Car.find({
    $or: [{ carType: search }, { carColor: search }, { carBrand: search }],
  }).then((car) => {
    console.info(car);
    console.info(`${car.length} matches`);
    mongoose.disconnect();
  });
};

//function to update a car
const updateCar = (_id, car) => {
  //have to use updateMany as update is a no longer supported function
  Car.updateMany({ _id }, car).then((car) => {
    console.info("car has been updated");
    mongoose.disconnect();
  });
};

const removeCar = (_id) => {
  Car.deleteOne({ _id })
    .then((result) => {
      if (result.deletedCount > 0) {
        console.info("car has been removed");
      } else {
        console.info("No car found with the provided _id");
      }
      mongoose.disconnect();
    })
    .catch((error) => {
      console.error("Error removing car:", error);
      mongoose.disconnect();
    });
};

const listCars = () => {
  Car.find().then((car) => {
    console.info(car);
    console.info(`${car.length} cars`);
    mongoose.disconnect();
  });
};

module.exports = {
  addCar,
  findCar,
  updateCar,
  removeCar,
  listCars,
};
