import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

// User Routes
app.post("/create-user", async (req, res) => {
  try {
    const createdUser = await prisma.user.create({ data: req.body });
    res.status(201).send({
      msg: "User Created Successfully!",
      user: createdUser,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/fetch-users", async (req, res) => {
  try {
    const fetchedUsers = await prisma.user.findMany();
    res.status(200).send({
      msg: "User Fetched Successfully!",
      user: fetchedUsers,
    });
  } catch (error) {
    console.log(error);
  }
});

app.patch("/update-user/:email", async (req, res) => {
  const email = req.params.email;
  const newPassword = req.body.password;

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: newPassword },
    });
    res.status(200).send({
      msg: "User Updated Successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete-user/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const deletedUser = await prisma.user.delete({
      where: { email },
    });
    res.status(200).send({
      msg: "User Deleted Successfully!",
      user: deletedUser,
    });
  } catch (error) {
    console.log(error);
  }
});

// Post Routes

app.post("/create-post", async (req, res) => {
  try {
    const createdPost = await prisma.post.create({ data: req.body });
    res.status(201).send({
      msg: "Post Created Successfully!",
      post: createdPost,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/fetch-posts", async (req, res) => {
  try {
    const fetchedPosts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    res.status(201).send({
      msg: "Post Fetched Successfully!",
      posts: fetchedPosts,
    });
  } catch (error) {
    console.log(error);
  }
});

const PORT: number = Number(process.env?.PORT) || 5005;
app.listen(PORT, () => {
  console.log(`🚀 Server is Running at PORT:- http://localhost:${PORT}`);
});
