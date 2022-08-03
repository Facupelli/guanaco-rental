const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEquipment(req, res, next) {
  const { category, order } = req.query;


  if (order || category) {
    const equipment = await prisma.equipment.findMany({
      where: {
        category: {
          name: category,
        },
      },
      orderBy: { price: order },
    });
    res.json(equipment);
    return;
  }

  const equipment = await prisma.equipment.findMany({});

  res.json(equipment);
}

module.exports = { getEquipment };
