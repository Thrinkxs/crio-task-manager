import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User Created Successfully!!!",
        users: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;
  User.findById(id)
    .exec()
    .then((user) => {
      console.log(user);
      if (user) {
        res.status(200).json({
          message: "user Found",
          user: user,
        });
      } else {
        res.status(404).json({ message: "No user found!!!!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const readAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .exec()
    .then((users) => {
      console.log(users);
      if (users) {
        res.status(200).json({
          message: "users Found",
          users: users,
        });
      } else {
        res.status(404).json({ message: "No users found!!!!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;
  return User.findById(id)
    .exec()
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: "No user with that Id exists",
        });
      } else {
        user.username = req.body.username;
        user
          .save()
          .then((result) => {
            res.status(200).json({
              message: "User Updated Successfully",
              updatedUser: result,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      }
    });
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;
  return User.findByIdAndRemove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted successfully",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

export default {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
};
