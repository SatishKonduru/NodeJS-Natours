const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  // res.status(200).send("Hello, I am from Server Side");
  res.status(200).json({
    message: "Hello, I am from Server side",
    app: "Natours",
  });
});

app.listen(PORT, () => {
  console.log(`Server is Running at PORT: ${PORT}`);
});
