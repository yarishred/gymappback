//Call 3rd Modules
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

//Admin Routes
const adminGymRoutes = require("./routes/adminGymRoutes");
const authGymRoutes = require("./routes/authGymRoutes");

// //Enviroment Variable
// dotenv.config()

// Create express server
const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

let port = 7000;

//Create Mongoose Database
const mongoDBURI = process.env.DB_MONGO_URI;
//Routes
app.use("/admin", adminGymRoutes);
app.use("/auth", authGymRoutes);

//Mongoose and request listener
mongoose
  .connect(mongoDBURI, { useNewUrlParser: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server listening on port : " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
