const Tour = require("./../models/tourModel");
const APIFeatures = require("./../utils/apiFeatures");

// Get All Tours from File
exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query).filter().sort();
    const tours = await features.query;

    // const tours = await Tour.find({});
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

// POST - Adding New Tour
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get by Tour Id
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
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
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

// PATCH - Updating tour
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Delete
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour Not Found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
      // message: "Tour Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};
