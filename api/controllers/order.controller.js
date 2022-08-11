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

  let book;

  try {
    book = await prisma.book.create({
      data: {
        dates: data.dates,
      },
    });

    await prisma.$transaction(
      newCart.map((item) =>
        prisma.bookOnEquipment.create({
          data: {
            book: { connect: { id: book.id } },
            equipment: { connect: { id: item.id } },
            quantity: item.quantity,
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
        user: { connect: { id: data.userId } },
        equipments: { connect: equipmentsIds },
        totalPrice: data.totalPrice,
        booking: { connect: { id: book.id } },
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
    include: { user: true, equipments: { include: { bookings: true } } },
  });

  res.json(orders);
}

module.exports = { postOrder, getOrders };
