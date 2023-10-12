import express from "express";
import controller from "../controller/User";

const router = express.Router();
router.get("/", controller.readAllUsers);

export = router;
