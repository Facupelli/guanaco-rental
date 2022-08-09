const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postOrder(req, res, next) {
  const data = req.body;

  const newOrder = await prisma.order.create({
    data: {
      userId: data.userId,
      equipments: { connect: data.equipmentsIds },
      totalPrice: data.totalPrice,
    },
  });

  res.json(newOrder);
}

module.exports = { postOrder };
