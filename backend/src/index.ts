import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { dbconfig } from "./config/dbconfig";

//Routes imports
import createTask from "./api/routes/CreateTask";
import createUser from "./api/routes/CreateUser";
import deleteTask from "./api/routes/DeleteTask";
import deleteUser from "./api/routes/DeleteUser";
import readSingleTask from "./api/routes/ReadSingleTask";
import readSingleUser from "./api/routes/ReadSingleUser";
import readTasks from "./api/routes/ReadTasks";
import readUsers from "./api/routes/ReadUsers";
import updateTask from "./api/routes/UpdateTask";
import updateUser from "./api/routes/UpdateUser";

const app = express();
const router = express();
const PORT: Number = 3001;
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(dbconfig.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });

//Routes
// user routes
app.use("/api/users/create", createUser);
app.use("/api/users/", readUsers);
app.use("/api/users/", readSingleUser);
app.use("/api/users/update", updateUser);
app.use("/api/users/delete", deleteUser);

//Task Routes
app.use("/api/tasks/create", createTask);
app.use("/api/tasks/", readTasks);
app.use("/api/tasks/", readSingleTask);
app.use("/api/tasks/update", updateTask);
app.use("/api/tasks/delete", deleteTask);

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
