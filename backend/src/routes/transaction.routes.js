import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransaction,
  getSummary,
} from "../controllers/transaction.controller.js";

const router = express.Router();


router.post("/create", createTransaction);
router.get("/summary/:userId", getSummary);
router.get("/:userId", getAllTransaction);
router.delete("/:transactionId", deleteTransaction);


export default router;
