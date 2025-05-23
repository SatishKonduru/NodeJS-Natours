const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT;
// Server Listeninng
app.listen(PORT, () => {
  console.log("TESTING..........");
  console.log(`Server is Running at PORT: ${PORT}`);
});
