import express from "express";
import controller from "../controller/User";

const router = express.Router();
router.delete("/:userId", controller.deleteUser);

export = router;
