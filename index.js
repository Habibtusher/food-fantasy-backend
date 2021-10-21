const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/user");
const foodRoute = require("./routes/food");
const checkLogin = require("./middlewares/checkLogin");
//midleware
app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 3000;
const db_url = process.env.DB_URL;

mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use("", userRoute);
app.use("",foodRoute);

app.get("/", (req, res) => {
  res.send("good luck bd");
});




const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};
app.use(errorHandler);
app.listen(port, () => {
  console.log("welcome");
});
