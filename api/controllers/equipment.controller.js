const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEquipment(req, res, next) {
  const { category, order } = req.query;

  const pipeline = { include: { bookings: true } };

  if (category && category !== "undefined" && category !== "all") {
    pipeline.where = {
      category: {
        name: category,
      },
    };
  }

  if (order && order !== "undefined" && order !== "none") {
    pipeline.orderBy = { price: order };
  }

  const equipment = await prisma.equipment.findMany(pipeline);

  res.json(equipment);
}

module.exports = { getEquipment };
