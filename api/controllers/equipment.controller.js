const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEquipment(req, res, next) {
  const { category } = req.query;

  if (category) {
    console.log(category);
    const equipment = await prisma.category.findMany({
      where: {
        name: category,
      },
      include: {
        equipments: true,
      },
    });
    res.json(equipment[0].equipments);
    return;
  }

  const equipment = await prisma.equipment.findMany({});
  res.json(equipment);
}

module.exports = { getEquipment };
