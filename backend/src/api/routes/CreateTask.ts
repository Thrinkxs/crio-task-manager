import express from "express";
import controller from "../controller/Task";

const router = express.Router();
router.post("/", controller.createTask);

export = router;
