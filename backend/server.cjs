const cors = require("cors");
const express = require("express");
const landingRoute = require("./routes/landing.cjs");
const cardatabase = require("./routes/getDatabase.cjs");
const getrandom = require("./routes/getRandom.cjs");
const mongoose = require("mongoose");
const Car = require("./models/carSchema.cjs"); //import our carSchema

//map global promise to get rid of warning
mongoose.Promise = global.Promise;
// connect to the database
const db = mongoose.connect("mongodb://localhost:27017/mission4");

//function to add a car
const addCar = (car) => {
  Car.create(car).then((car) => {
    console.info("New car Added");
    db.close();
  });
};

// function to find a car
const findCar = (model) => {
  // make case insensitive
  const search = new RegExp(model, "i");
  // return the result of the find operation
  return (
    Car.find({ $or: [{ carType: search }, { carBrand: search }] })
      .then((car) => {
        console.info(car);
        console.info(`${car.length} matches`);
        db.close();
      })
      //output error if cant find match
      .catch((error) => {
        console.error(error, "error in find car function");
        db.close();
      })
  );
};

module.exports = {
  addCar,
  findCar,
};

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

// mongoose
//   .connect("mongodb://localhost:27017/Mission4,", {
//     useNewURLParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("connected to mongodb");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
