const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postOrder(req, res, next) {
  const data = req.body;

  const newCart = data.cart.map((item) => {
    if (!item.quantity) {
      return { ...item, quantity: 1 };
    }
    return item;
  });

  const equipmentByQty = newCart.reduce(function (r, a) {
    r[a.quantity] = r[a.quantity] || [];
    r[a.quantity].push(a);
    return r;
  }, Object.create(null));

  const keys = Object.keys(equipmentByQty);

  try {
    await prisma.$transaction(
      keys.map((key) => {
        const equipmentsIds = equipmentByQty[key].map((gear) => ({
          id: gear.id,
        }));
        return prisma.book.create({
          data: {
            dates: data.dates,
            quantity: Number(key),
            equipments: { connect: equipmentsIds },
          },
        });
      })
    );
  } catch (e) {
    console.log("equipment book update error:", e);
    return;
  }

  // try {
  //   await prisma.$transaction(
  //     data.cart.map((item) =>
  //       prisma.equipment.update({
  //         where: { id: item.id },
  //         data: {
  //           bookings: {
  //             create: {
  //               quantity: item.quantity,
  //               dates: data.date,
  //             },
  //           },
  //         },
  //       })
  //     )
  //   );
  // } catch (e) {
  //   console.log("equipment book update error:", e);
  //   return;
  // }

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

async function getOrders(req, res, next) {
  const orders = await prisma.order.findMany({
    include: { user: true, equipments: true },
  });

  res.json(orders);
}

module.exports = { postOrder, getOrders };
