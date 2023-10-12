import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Task from "../models/Task";

const createTask = (req: Request, res: Response, next: NextFunction) => {
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    assignee: req.body.assignee,
    status: req.body.status,
    category: req.body.category,
  });
  task
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Task Created Successfully!!!",
        createdTask: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const readTask = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.taskId;
  Task.findById(id)
    .populate("assignee", "username")
    .exec()
    .then((task) => {
      if (task) {
        res.status(200).json({
          message: "task Found",
          task: task,
        });
      } else {
        res.status(404).json({ message: "No task found!!!!" });
      }
    });
};

const readAllTask = (req: Request, res: Response, next: NextFunction) => {
  Task.find()
    .populate("assignee")
    .exec()
    .then((tasks) => {
      if (tasks) {
        res.status(200).json({
          message: "All tasks Found",
          tasks: tasks,
        });
      } else {
        res.status(404).json({ message: "No tasks found!!!!" });
      }
    });
};

const updateTask = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.taskId;
  Task.findByIdAndUpdate(id)

    .exec()
    .then((task) => {
      if (!task) {
        res.status(404).json({ message: "No task found!!!!" });
      } else {
        task
          .set(req.body)
          .save()
          .then((result) => {
            res.status(200).json({
              message: "Task updated",
              result: result,
            });
          });
      }
    });
  // const updateOps = req.body;
  // return Task.updateOne({ _id: id }, { $set: updateOps })
  //     .exec()
  //     .then((result) => {
  //     console.log(result);
  //     res.status(200).json({
  //         message: "Task updated",
  //         result: result,
  //     });
  //     });
};

const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.taskId;
  Task.findByIdAndRemove(id)
    .exec()
    .then((result) => {
      result
        ? res.status(200).json({
            message: "Task deleted",
            result: result,
          })
        : res.status(404).json({
            message: "Task not found",
          });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        error: err,
      });
    });
};

export default {
  createTask,
  readTask,
  readAllTask,
  updateTask,
  deleteTask,
};
