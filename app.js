const express = require("express");
const fs = require("fs");
const PORT = 3000;
const app = express();

app.use(express.json()); //use() built-in middleware comes with expressJS
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

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

// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// Server Listeninng
app.listen(PORT, () => {
  console.log(`Server is Running at PORT: ${PORT}`);
});
