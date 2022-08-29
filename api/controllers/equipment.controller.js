const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEquipment(req, res, next) {
  const { category, order, search } = req.query;

  try {
    if (search && search !== "undefined") {
      const equipmentBySearch = await prisma.equipment.findMany({
        where: {
          available: true,
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
    res.json({ errorMessage: "error searching, please refresh" });
    return;
  }

  try {
    const pipeline = {
      where: { available: true },
      include: { bookings: { include: { book: true } } },
    };

    if (category && category !== "undefined" && category !== "all") {
      pipeline.where = {
        ...pipeline.where,
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
    res.json({ errorMessage: "error getting equipment, please refresh" });
    return;
  }
}

module.exports = { getEquipment };
