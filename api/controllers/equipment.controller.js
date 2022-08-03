const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEquipment(req, res, next) {
  const { category, order } = req.query;

  const pipeline = {};

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

  // if (order || category) {
  //   const equipment = await prisma.equipment.findMany({
  //     where: {
  //       category: {
  //         name: category === "all" ? undefined : category,
  //       },
  //     },
  //     orderBy: { price: order },
  //   });
  //   res.json(equipment);
  //   return;
  // }

  const equipment = await prisma.equipment.findMany(pipeline);

  res.json(equipment);
}

module.exports = { getEquipment };
