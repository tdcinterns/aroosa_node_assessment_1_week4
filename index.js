const express = require("express");
const mongoose = require("mongoose");

const app = express();

const userController = require('./Controllers/userController');
const taskRouter = require('./Router/tasksRouter');

app.use(express.json());
app.use('/api',taskRouter);

//User Controller Functions
app.post('/signUp', userController.signUp);
app.post('/signIn', userController.signIn);


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