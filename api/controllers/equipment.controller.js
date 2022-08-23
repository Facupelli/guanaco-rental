const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEquipment(req, res, next) {
  const { category, order, search } = req.query;

  try {
    if (search && search !== "undefined") {
      const equipmentBySearch = await prisma.equipment.findMany({
        where: {
          OR: [
            {
              name: {
                search: search,
              },
            },
            {
              brand: {
                search: search,
              },
            },
            {
              model: {
                search: search,
              },
            },
          ],
        },
        include: { bookings: { include: { book: true } } },
      });
      res.json(equipmentBySearch);
      return;
    }
  } catch (e) {
    console.log("search equipment error:", e);
    return;
  }

  try {
    const pipeline = { include: { bookings: { include: { book: true } } } };

    if (category && category !== "undefined" && category !== "all") {
      pipeline.where = {
        category: {
          name: category,
        },
      };
    }

    if (order && order !== "undefined" && order !== "null" && order !== "none") {
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
