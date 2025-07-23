const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT;

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connected To MongoDB."));
// .catch(() => console.log("ERRRRRRRRRRRRORRRRRRRRRRRRRRR"));

// Server Listeninng
const server = app.listen(PORT, () => {
  console.log(`Server is Running at PORT: ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});