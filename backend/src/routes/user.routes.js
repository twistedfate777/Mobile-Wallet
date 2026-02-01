import express from "express";
import { createUserIfNotExist } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/create", createUserIfNotExist);

export default router;
