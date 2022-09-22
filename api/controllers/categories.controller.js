const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getCategories(req, res, next) {
  try {
    const categories = await prisma.category.findMany({});

    res.json(categories);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getCategories,
};
