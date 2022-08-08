const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postUser(req, res, next) {
  const data = req.body;

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
}

module.exports = { postUser };
