const { PrismaClient } = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 3001

app.use(express.json());

// app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// app.use("/recipe", recipeRoutes);

app.get("/", async (req, res) => {
//   const posts = await prisma.post.findMany({
//     where: { published: true },
//     include: { author: true },
//   });
  res.json({John: "DOE"});
});

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
