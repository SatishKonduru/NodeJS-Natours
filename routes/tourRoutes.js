const express = require("express");
const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const router = express.Router();

// Get All Tours from File
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
};

// POST - Adding New Tour
const createTour = (req, res) => {
  const newTour = req.body;
  newTour.id = tours.length + 1;
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// Get by Tour Id
const getTour = (req, res) => {
  const tourId = req.params.id;
  if (!tourId || isNaN(tourId)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
  const tour = tours.find((el) => el.id === parseInt(tourId));
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Tour Not Found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

// PATCH - Updating tour
const updateTour = (req, res) => {
  const tourId = req.params.id;

  if (!tourId || isNaN(tourId)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
  const tour = tours.find((el) => el.id === parseInt(tourId));
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Tour Not Found",
    });
  }

  const updatedTour = { ...tour, ...req.body };
  const index = tours.findIndex((el) => el.id === parseInt(tourId));
  tours[index] = updatedTour;
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "succcess",
        data: {
          tour: updatedTour,
        },
      });
    }
  );
};

// Delete
const deleteTour = (req, res) => {
  const tourId = req.params.id;

  if (!tourId || isNaN(tourId)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
  const tour = tours.find((el) => el.id === parseInt(tourId));
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Tour Not Found",
    });
  }
  const index = tours.indexOf(tour);
  tours.splice(index, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "succcess",
        data: null,
      });
    }
  );
};

router.route("/").get(getAllTours).post(createTour);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
