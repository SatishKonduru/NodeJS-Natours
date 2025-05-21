const express = require("express");
const fs = require("fs");
const morgon = require("morgan");
const PORT = 3000;
const tourRoutes = express.Router();
const userRoutes = express.Router();
const app = express();

app.use(morgon("dev"));
app.use(express.json()); //use() built-in middleware comes with expressJS

app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);
// Server Listeninng
app.listen(PORT, () => {
  console.log(`Server is Running at PORT: ${PORT}`);
});
