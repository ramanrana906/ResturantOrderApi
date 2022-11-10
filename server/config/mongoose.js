

const mongoose = require("mongoose");


mongoose.connect(
  `mongodb+srv://ramanrana:raman@cluster0.0mwirqc.mongodb.net/test`
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error in conncting to DB"));

db.once("open", function () {
  console.log("connected to database::MongoDb");
});

module.exports = db;