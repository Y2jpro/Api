import express from "express";
import pool from "../db.js";
const router = express.Router();
import * as applicationController from "../controllers/applicationController.js";

// get all user data
router.get("/",applicationController.getAllUserData);

router.post("/",applicationController.createUser);

router.put("/:id",applicationController.updateUser);

router.use("/:id",applicationController.deleteUser);           


export default router;