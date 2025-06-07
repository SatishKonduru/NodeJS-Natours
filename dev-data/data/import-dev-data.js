const fs = require("fs");
require("dotenv").config();
const mongoose = require("mongoose");
const Tour = require("./../../models/tourModel");

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connected To MongoDB"));

// READ JSON File
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

//Fixing date format before importing
tours.forEach((tour) => {
  tour.startDates = tour.startDates.map(
    (date) => new Date(date.replace(",", "T") + ":00Z")
  );
});

// IMPORT Data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE All Data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data Successfully Deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
