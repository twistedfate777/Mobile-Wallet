import { prisma } from "../../lib/prisma.js";

export const createUserIfNotExist = async (req, res) => {
  try {
    const { id:userId, email, username } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id:userId
      }
    });

    if (user) {
      return res.status(200).json({message:"User already exist"});
    }

    await prisma.user.create({
      data: {
        id:userId,
        username,
        email,
      },
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error in createUserIfNotExist", error);
  }
};
