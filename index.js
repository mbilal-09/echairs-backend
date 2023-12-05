const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const getProductRoute = require("./routes/getProducts");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const emailRoute = require("./routes/emailRoute");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//cookies
app.use(cookieParser());
//json
app.use(express.json());
//morgan
app.use(morgan("tiny"));

//routes
app.use("/products", getProductRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/email", emailRoute);

//connect mongo db
mongoose
  .connect(`${process.env.MONGO_DB_URL}`)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => console.log("db not connected" + error));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port`);
});

app.get("/", (req, res) => {
  res.send("Working properly");
});
