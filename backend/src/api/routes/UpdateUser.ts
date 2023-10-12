import express from "express";
import controller from "../controller/User";

const router = express.Router();
router.patch("/:userId", controller.updateUser);

export = router;
