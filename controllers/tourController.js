const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// MIDDLEWAREs
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing Name or Price",
    });
  }
  next();
};

// Get All Tours from File
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
};

// POST - Adding New Tour
exports.createTour = (req, res) => {
  const newTour = req.body;
  newTour.id = tours.length + 1;
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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
exports.getTour = (req, res) => {
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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
