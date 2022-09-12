const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getTotalOfOrders(req, res, next) {
  try {
    const totalPrice = await prisma.order.aggregate({
      _sum: {
        totalPrice: true,
      },
    });

    res.json(totalPrice);
  } catch (e) {
    console.log("getTotalOfOrders error:", e);
  }
}

module.exports = {
  getTotalOfOrders,
};
