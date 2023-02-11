const express = require("express");
const app = express();
var cors = require("cors");

require("dotenv").config();

//middlware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES
app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes/recipes"));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
