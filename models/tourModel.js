const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = import("validator");
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "Tour name must have lesstha 40 characters"],
      minlength: [10, "Tour name must have more or eqaul to 10 characters"],
      // validate: [validator.isAlpha, 'Tour name must contain only characters not digits']
    },
    slug: String,
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
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      defualt: 0,
    },
    price: {
      type: Number,
      required: [true, "A Tour must have a Price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: `Discount price ({value}) should be below regular price`,
      },
    },
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
    secretTour: {
      type: Boolean,
      defualt: false,
    },
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

// Document Middleware - Runs before(pre-hooks)/after(post-hooks) .save & .create()
// Not works with .insertMany(), .findOneById(), .findOneByIdAndUpdate()
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre("save", function (next) {
  console.log("Document will save in a moment....");
  next();
});

tourSchema.post("save", function (doc, next) {
  console.log(doc);
  next();
});

// Query Middlewares
// tourSchema.pre("find", function (next) {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });
// tourSchema.pre("findOne", function (next) {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });
tourSchema.pre(/^find/, function (next) {
  this.start = Date.now();
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  // console.log(docs);
  console.log(`Query tooks ${Date.now() - this.start} milliseconds`);
  next();
});

// Aggregation Middleware
tourSchema.pre("aggregate", function (next) {
  console.log(this.pipeline());
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
