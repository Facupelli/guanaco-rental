const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postUser(req, res, next) {
  const data = req.body;

  try {
    const upsertUser = await prisma.user.upsert({
      where: {
        email: data.email,
      },
      update: {},
      create: {
        email: data.email,
      },
    });

    res.json(upsertUser);
  } catch (e) {
    console.log("postUser error:", e);
    return;
  }
}

async function getUsers(req, res, next) {
  const users = await prisma.user.findMany({});

  res.json(users);
}

module.exports = { postUser, getUsers };
