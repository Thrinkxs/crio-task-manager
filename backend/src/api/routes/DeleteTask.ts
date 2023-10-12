import express from "express";
import controller from "../controller/Task";

const router = express.Router();
router.delete("/:taskId", controller.deleteTask);

export = router;
