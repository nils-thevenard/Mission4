const program = require("commander");
// const { prompt } = require("inquirer");
// const { addEntry } = require("./functions.cjs");
const { addCar, findCar } = require("../server.cjs");

program.version("1.0.0").description("Client Management System");

program
  .command("add <imageURL> <carType> <carColor> <carBrand> <carPrice>")
  .alias("a")
  .description("add a car")
  .action((imgURL, carType, carColor, carBrand, carPrice) => {
    addCar({ imgURL, carType, carColor, carBrand, carPrice });
  });

program
  .command("find <carType>")
  .alias("f")
  .description("find a car")
  .action((model) => findCar(model));

// program.parse(argv);
// program
//   .command("addOne <carColor> <brand>")
//   .alias("a")
//   .description("Add an entry")
//   .action(async (carColor, carBrand) => {
//     const inputData = { carColor: carColor, carBrand: carBrand };
//     await addEntry(inputData);
//   });

// const questions = [
//   {
//     type: "input",
//     name: "carColor",
//     message: "Enter a color",
//   },
//   {
//     type: "input",
//     name: "carBrand",
//     message: "Enter a car brand",
//   },
// ];

// program
//   .command("add")
//   .alias("a")
//   .description("Add an entry")
//   .action(() => {
//     prompt(questions).then((answers) => addEntry(answers));
//   });

program.parse(process.argv);
