const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const HttpError = require("./models/http-error");
const { checkLogin, logout } = require("./middleware/check-login");

const app = express();

const customersRoutes = require("./routes/customers-routes");
const sellersRoutes = require("./routes/sellers-routes");
const productsRoutes = require("./routes/products-routes");
const coursesRoutes = require("./routes/courses-routes");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/customers", customersRoutes);
app.use("/sellers", sellersRoutes);
app.use("/products", productsRoutes);
app.use("/courses", coursesRoutes);
app.get("/loggedIn", checkLogin);
app.get("/loggedOut", logout);

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome " });
});

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qv7f7hm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(5000);
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });
