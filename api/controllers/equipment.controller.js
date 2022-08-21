const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEquipment(req, res, next) {
  const { category, order } = req.query;

  try {
    const pipeline = { include: { bookings: { include: { book: true } } } };

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
  } catch (e) {
    console.log("find equipment error:", e);
    return;
  }
}

module.exports = { getEquipment };
