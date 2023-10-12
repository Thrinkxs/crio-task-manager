import express from "express";
import controller from "../controller/Task";

const router = express.Router();
router.get("/", controller.readAllTask);

export = router;
