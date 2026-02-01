import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import rateLimiter from "../middleware/rateLimiter.js";
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin:'http://localhost:8081',
  credentials:true
}))

app.use(express.json());
app.use(rateLimiter);

app.use("/api/transactions", transactionRoutes);
app.use("/api/users",userRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
