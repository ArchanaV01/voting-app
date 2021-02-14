const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routeurls = require("./routes/router");
const cors = require("cors");
dotenv.config();

mongoose.connect(process.env.DB_ACCESS, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
app.use(express.json());
app.use(cors());
app.use("/api", routeurls);
app.listen(4000, () => {
  console.log("Server is running");
});
