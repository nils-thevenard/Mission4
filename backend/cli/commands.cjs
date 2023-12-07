#!/usr/bin/env node
// importing libraries
const program = require("commander");
const { prompt } = require("inquirer");

// importing the functions from functions.cjs
const {
  addCar,
  findCar,
  updateCar,
  removeCar,
  listCars,
} = require("./functions.cjs");

program.version("1.0.0").description("Client Management System");

// define add process
program
  .command("add")
  .alias("a")
  .description("Add an entry")
  .action(() => {
    prompt(questions).then((answers) => addCar(answers));
  });

// defining the questions asked in the add process
const questions = [
  {
    type: "input",
    name: "imgUrl",
    message: "Please enter a URL",
  },
  {
    type: "input",
    name: "carType",
    message: "Please enter a car type",
  },
  {
    type: "input",
    name: "carColor",
    message: "Please enter a car color",
  },
  {
    type: "input",
    name: "carBrand",
    message: "Please enter a car brand",
  },
  {
    type: "input",
    name: "carPrice",
    message: "Please enter a car price",
  },
];

// define find process
program
  .command("find <carType>")
  .alias("f")
  .description("find a car")
  .action((model) => findCar(model));

// define update process
program
  .command("update <_id>")
  .alias("u")
  .description("update a car")
  .action((_id) => {
    prompt(questions).then((answers) => updateCar(_id, answers));
  });

// define remove process
program
  .command("remove <_id>")
  .alias("r")
  .description("remove a car")
  .action((_id) => removeCar(_id));

//define list process
program
  .command("list")
  .alias("l")
  .description("list all cars")
  .action(() => listCars());

program.parse(process.argv);
