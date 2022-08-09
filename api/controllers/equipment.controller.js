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

  // const bookings = await prisma.equipment.findMany({
  //   where: {
  //     id: "cl6dtamsf0456xcuwebahtec3",
  //   },
  //   include: { bookings: { where: { date: "8/21/2022" } } },
  // });
  // res.json(bookings);
}

module.exports = { getEquipment };
