const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/images")
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log(err);
  });
