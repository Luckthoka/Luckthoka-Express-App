const path = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  //res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then((result) => {
    var listener = app.listen(3200, function () {
      console.log("Listening on port " + listener.address().port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
