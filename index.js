const express = require("express");
const mongoose = require("mongoose");

const app = express();

const taskRouter = require('./Router/tasksRouter');
const userRouter = require('./Router/userRouter');

//Routers
app.use(express.json());
app.use('/api',taskRouter);
app.use('/',userRouter);


//Function to start the server and for database connection
const start = async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://nodeassess:uf4a8VRhQYYAxxxG@cluster0.b6msxto.mongodb.net/", {
        });
      app.listen(3000, () => {
        console.log("Server started on port 3000")
        });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  start();

module.exports = app;