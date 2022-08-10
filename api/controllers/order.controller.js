const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postOrder(req, res, next) {
  const data = req.body;

  try {
    await prisma.$transaction(
      data.cart.map((item) =>
        prisma.equipment.update({
          where: { id: item.id },
          data: {
            bookings: {
              create: {
                quantity: item.quantity,
                dates: data.date,
              },
            },
          },
        })
      )
    );
  } catch (e) {
    console.log("equipment book update error:", e);
    return;
  }

  try {
    const equipmentsIds = data.cart.map((item) => ({ id: item.id }));

    const newOrder = await prisma.order.create({
      data: {
        userId: data.userId,
        equipments: { connect: equipmentsIds },
        totalPrice: data.totalPrice,
      },
    });

    res.json({ message: "success", newOrder });
  } catch (e) {
    console.log("order create error:", e);
    return;
  }
}

module.exports = { postOrder };
