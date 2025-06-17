const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Tour must have a name"],
      unique: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "A Tour must have duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A Tour must have Group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A Tour must have Difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Dificulty must have 'easy', 'medium' or 'difficult' ",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      defualt: 0,
    },
    price: {
      type: Number,
      required: [true, "A Tour must have a Price"],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, "A Tour must have Summary"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A Tour must have a Cover Image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
