import express from "express";
import controller from "../controller/Task";

const router = express.Router();
router.patch("/:taskId", controller.updateTask);

export = router;
