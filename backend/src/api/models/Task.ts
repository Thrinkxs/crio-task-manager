import mongoose, { InferSchemaType } from "mongoose";
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  assignee: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    // populate: "username",
  },
  status: {
    type: String,
  },
  category: {
    type: String,
  },
});

type Task = InferSchemaType<typeof TaskSchema>;
const Task = mongoose.model("Task", TaskSchema);

export default Task;
