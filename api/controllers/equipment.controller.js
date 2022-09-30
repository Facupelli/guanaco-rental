const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getEquipment(req, res, next) {
  const { location, category, order, search, available } = req.query;

  const wherePipeline = [];

  if (!available) {
    wherePipeline.push({ available: true });
  }

  if (location) {
    wherePipeline.push({ location });
  }

  if (search) {
    wherePipeline.push({
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
    });
  }

  try {
    if (search && search !== "undefined") {
      const equipmentBySearch = await prisma.equipment.findMany({
        where: {
          AND: wherePipeline,
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
        AND: wherePipeline,
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
        // where: { id: data.id },
        data: {
          name: data.name,
          brand: data.brand,
          model: data.model,
          available: Boolean(data.available),
          stock: Number(data.stock),
          price: Number(data.price),
          location: data.location,
          image: data.image,
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

async function postEquipment(req, res, next) {
  const data = req.body;

  try {
    if (data) {
      const postGear = await prisma.equipment.create({
        data: {
          name: data.name,
          brand: data.brand,
          model: data.model,
          image: data.image,
          stock: Number(data.stock),
          price: Number(data.price),
          accessories: data.accessories,
          category: { connect: { id: data.category } },
          owner: data.owner,
          location: data.location,
        },
      });

      res.json({ message: "success", postGear });
    } else {
      console.log("error postOrder:", e);
    }
  } catch (e) {
    next(e);
  }
}

async function deleteEquipment(req, res, next) {
  const id = req.params;
  try {
    if (id) {
      const deletedEquipment = await prisma.equipment.delete({
        where: id,
      });

      res.json({ message: "success", deletedEquipment });
    } else {
      res.json({ message: "missing id" });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = { getEquipment, putEquipment, postEquipment, deleteEquipment };
