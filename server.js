const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connected To MongoDB."));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A Tour must have a Price"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
  name: "The Forest Hicker",
  rating: 4.5,
  price: 500,
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err));

// Server Listeninng
app.listen(PORT, () => {
  console.log(`Server is Running at PORT: ${PORT}`);
});
