#!/usr/bin/env node
const program = require("commander");
const { prompt } = require("inquirer");
// const { addEntry } = require("./functions.cjs");

// adding in the functions
const {
  addCar,
  findCar,
  updateCar,
  removeCar,
  listCars,
} = require("../server.cjs");

program.version("1.0.0").description("Client Management System");

program
  .command("add")
  .alias("a")
  .description("Add an entry")
  .action(() => {
    prompt(questions).then((answers) => addCar(answers));
  });

program
  .command("find <carType>")
  .alias("f")
  .description("find a car")
  .action((model) => findCar(model));

program
  .command("update <_id>")
  .alias("u")
  .description("update a car")
  .action((_id) => {
    prompt(questions).then((answers) => updateCar(_id, answers));
  });

program
  .command("remove <_id>")
  .alias("r")
  .description("remove a car")
  .action((_id) => removeCar(_id));

program
  .command("list")
  .alias("l")
  .description("list all cars")
  .action(() => listCars());

const questions = [
  {
    type: "input",
    name: "imgUrl",
    message: "Enter a URL",
  },
  {
    type: "input",
    name: "carType",
    message: "Enter a car type",
  },
  {
    type: "input",
    name: "carColor",
    message: "Enter a car color",
  },
  {
    type: "input",
    name: "carBrand",
    message: "Enter a car brand",
  },
  {
    type: "input",
    name: "carPrice",
    message: "Enter a car price",
  },
];

program.parse(process.argv);
