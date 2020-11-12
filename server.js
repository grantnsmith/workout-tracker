const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// NEW MONGOOSE CONNECTION

mongoose.connect(process.env.ORMONGO_URL, {
  user: process.env.ORMONGO_USER,
  pass: process.env.ORMONGO_PASS,
});
mongoose.connection.on("connected", function () {
  console.log(
    "Mongoose successfully connected to Db at" + process.env.ORMONGO_URL
  );
});

// OLD MONGOOSE CONNECTION
// mongoose.connect(process.env.ORMONGO_RS_URL || "mongodb://localhost/workout", {
//   useNewUrlParser: true,
// });

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
