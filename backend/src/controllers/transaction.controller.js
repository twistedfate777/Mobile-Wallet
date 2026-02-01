import { prisma } from "../../lib/prisma.js";

export const createTransaction = async (req, res) => {
  try {
    const { title, amount, category, userId } = req.body;

    if (!title || amount === undefined || !category || !userId) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    await prisma.transactions.create({
      data: {
        userId,
        title,
        amount,
        category,
      },
    });

    return res
      .status(201)
      .json({ message: "Transactions created successfully" });
  } catch (error) {
    console.log("Error in create transaction", error);
    res.status(500).json({ message: error });
  }
};

export const getAllTransaction = async (req, res) => {
  try {
    const userId = req.params;
    if (!userId) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const transactions = await prisma.transactions.findMany({
      where: userId,
    });

    return res.status(200).json(transactions);
  } catch (error) {
    console.log("Error in getAllTransaction", error);
    res.status(500).json({ message: error });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const {transactionId} = req.params;
    const transaction = await prisma.transactions.findUnique({
      where: {
        id: transactionId,
      }
    });
    if (!transaction) {
      return res.status(400).json({ message: "Transaction does not exist" });
    }

    await prisma.transactions.delete({
      where: {
        id: transactionId,
      }
    });
    return res
      .status(200)
      .json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("Error in deleteTransaction", error);
    res.status(500).json({ message: error });
  }
};

export const getSummary = async (req, res) => {
  try {
    const userId = req.params;
    if (!userId) {
      return res.status(404).json({ message: "User does not exist" });
    }
    let expenses = 0;
    let income = 0;
    const transactions =
      (await prisma.transactions.findMany({
        where: userId,
      })) || [];
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].amount > 0) {
        income += transactions[i].amount;
      } else expenses += transactions[i].amount;
    }
    let balance = income + expenses;

    return res.status(200).json({ income, expenses, balance });
  } catch (error) {
    console.log("Error in getSummary", error);
    res.status(500).json({ message: error });
  }
};
