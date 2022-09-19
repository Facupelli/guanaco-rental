const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getTotalOfOrders(req, res, next) {
  const { location } = req.query;

  try {
    const totalPrice = await prisma.order.aggregate({
      where: {
        location: location === "all" || !location ? undefined : location,
      },
      _sum: {
        totalPrice: true,
      },
    });

    res.json(totalPrice);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getTotalOfOrders,
};
