const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEquipment(req, res, next) {
  const { location, category, order, search, available } = req.query;

  console.log(location, category, order, search)

  try {
    if (search && search !== "undefined") {
      const equipmentBySearch = await prisma.equipment.findMany({
        where: {
          AND: [
            {
              available: true,
            },
            {
              location,
            },
            {
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
          ],
        },
        include: { bookings: { include: { book: true } } },
      });
      res.json(equipmentBySearch);
      return;
    }
  } catch (e) {
    next(e);
  }

  try {
    const pipeline = {
      where: {
        AND: [
          {
            available: true,
          },
          {
            location,
          },
        ],
      },
      include: { bookings: { include: { book: true } } },
      orderBy: { bookings: { _count: "desc" } },
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
    next(e);
  }
}

async function putEquipment(req, res, next) {
  const data = req.body;

  try {
    if (data.id) {
      const updatedGear = await prisma.equipment.update({
        where: { id: data.id },
        data: {
          name: data.name,
          brand: data.brand,
          model: data.model,
          available: Boolean(data.available),
          stock: Number(data.stock),
          price: Number(data.price),
          location: data.location,
        },
      });

      res.json({ message: "success", updatedGear });
    } else {
      console.log("missing gear id");
    }
  } catch (e) {
    next(e);
  }
}

module.exports = { getEquipment, putEquipment };
