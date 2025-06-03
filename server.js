const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connected To MongoDB."));

// Server Listeninng
app.listen(PORT, () => {
  console.log(`Server is Running at PORT: ${PORT}`);
});
