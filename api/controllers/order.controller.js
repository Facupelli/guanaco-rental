const { PrismaClient } = require("@prisma/client");
const { sendOrderSuccessEmail } = require("../utils/mailer");
const { sendWsMessage } = require("../utils/whatsapp");
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
        pickupHour: data.pickupHour,
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

  let newOrder;

  try {
    const equipmentsIds = data.cart.map((item) => ({ id: item.id }));

    newOrder = await prisma.order.create({
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
    const bookDeleted = await prisma.book.delete({ where: { id: book.id } });
    console.log(bookDeleted);
    return;
  }

  try {
    const orderData = await prisma.order.findUnique({
      where: { id: newOrder.id },
      include: {
        user: { select: { fullName: true, phone: true, email: true } },
        booking: true,
        equipments: {
          select: { name: true, brand: true, model: true, bookings: true },
        },
      },
    });

    // const mailData = {
    //   user: orderData.user.fullName,
    //   phone: orderData.user.phone,
    //   email: orderData.user.email,
    //   dates: orderData.booking.dates.join(", "),
    //   equipment: orderData.equipments.map(
    //     (gear) =>
    //       `${gear.name} ${gear.brand} ${gear.model} x${
    //         gear.bookings.filter(
    //           (book) => book.bookId === orderData.booking.id
    //         )[0].quantity
    //       }`
    //   ),
    //   totalPrice: orderData.totalPrice,
    // };

    // sendOrderSuccessEmail(mailData);

    const msgData = {
      phone: orderData.user.phone,
      fullName: orderData.user.fullName,
      pickupHour: orderData.booking.pickupHour,
      pickupDay: new Date(orderData.booking.dates[0]).toLocaleDateString(),
      returnDay: new Date(
        orderData.booking.dates[orderData.booking.dates.length - 1]
      ).toLocaleDateString(),
      equipmentList: orderData.equipments
        .map(
          (gear) =>
            `x${
              gear.bookings.filter(
                (book) => book.bookId === orderData.booking.id
              )[0].quantity
            } ${gear.name} ${gear.brand} ${gear.model}`
        )
        .join("-  "),
    };

    console.log("msgData", msgData);

    const sentWsMessage = await sendWsMessage(msgData);
    console.log(sentWsMessage);
  } catch (e) {
    console.log(e);
  }
}

async function getOrders(req, res, next) {
  try {
    const { id, skip } = req.query;

    if (id) {
      const order = await prisma.order.findUnique({
        where: { id },
        include: {
          booking: true,
          equipments: { include: { bookings: true } },
          user: true,
        },
      });
      res.json(order);
      return;
    }

    const orders = await prisma.order.findMany({
      include: {
        _count: {},
        user: true,
        equipments: { include: { bookings: true } },
        booking: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: Number(skip),
      take: 10,
    });

    const count = await prisma.order.count({
      select: {
        _all: true,
      },
    });

    res.json({ orders, count: count._all });
  } catch (e) {
    console.log("getOrders error:", e);
  }
}

async function deleteOrderById(req, res, next) {
  const id = req.params;

  try {
    if (id) {
      const deletedOrder = await prisma.book.delete({
        where: id,
      });

      res.json({ message: "success", deletedOrder });
    }
  } catch (e) {
    console.log(e);
    return;
  }
}

module.exports = { postOrder, getOrders, deleteOrderById };
