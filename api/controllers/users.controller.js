const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postUser(req, res, next) {
  const { username, email } = req.query;

  console.log(username, email)

  res.json({username, email});
}

module.exports = { postUser };