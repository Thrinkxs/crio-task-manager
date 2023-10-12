import express from "express";
import controller from "../controller/Task";

const router = express.Router();
router.get("/:taskId", controller.readTask);

export = router;
