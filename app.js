const express = require("express"); //imported or required express package
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const foodsRoute = require("./routes/foodsRoutes");

//basic

const app = express(); //initialize the express

//including the middleware (always before the route)

app.use(morgan("dev")); // how to use it
app.use(express.json()); //it comes with the express. Without it, you cannot any request from the request body
app.use(cors());
// routes
app.use("/api/v1/foods", foodsRoute);

const port = process.env.PORT; //every app runs on a particular port number

const DBConnectionString = process.env.Mongo_uri;
const connectDB = async () => {
  try {
    await mongoose.connect(DBConnectionString);
    console.log("Db connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// app.get('/', (req, res) =>{
//   res.send('Welcome to the Home Route')
// })
//listing at this particular port
app.listen(port, () => {
  connectDB();
  console.log(`server is running on port ${port}`);
});
