const { PrismaClient } = require("@prisma/client");
const { sendMail } = require("../utils/mailer");
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

  // CREATE BOOK & CREATE BOOKONEQUIPMENT FOR EVERY GEAR
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
    next(e);
  }

  let newOrder;

  // CREATE ORDER CONNECTING PREVIOUS BOOK
  try {
    const equipmentsIds = data.cart.map((item) => ({ id: item.id }));

    const newData = {
      user: { connect: { id: data.userId } },
      equipments: { connect: equipmentsIds },
      totalPrice: data.totalPrice,
      booking: { connect: { id: book.id } },
      location: data.location,
    };

    if (data.couponId) {
      newData.coupon = { connect: { id: data.couponId } };
    }

    newOrder = await prisma.order.create({
      data: newData,
    });

    res.json({ message: "success", newOrder });
  } catch (e) {
    const bookDeleted = await prisma.book.delete({ where: { id: book.id } });
    next(e);
  }

  // SEND EMAIL TO ADMINS & WS MESSAGE TO USER
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

    // const mailSent = await sendMail(mailData);
    // console.log("MAIL", mailSent);

    // const msgData = {
    //   phone: orderData.user.phone,
    //   fullName: orderData.user.fullName,
    //   pickupHour: orderData.booking.pickupHour,
    //   pickupDay: new Date(orderData.booking.dates[0]).toLocaleDateString(),
    //   returnDay: new Date(
    //     orderData.booking.dates[orderData.booking.dates.length - 1]
    //   ).toLocaleDateString(),
    //   equipmentList: orderData.equipments
    //     .map(
    //       (gear) =>
    //         `x${
    //           gear.bookings.filter(
    //             (book) => book.bookId === orderData.booking.id
    //           )[0].quantity
    //         } ${gear.name} ${gear.brand} ${gear.model}`
    //     )
    //     .join("-  "),
    // };

    // const sentWsMessage = await sendWsMessage(msgData);
    // console.log(sentWsMessage);
  } catch (e) {
    next(e);
  }
}

async function putOrder(req, res, next) {
  const data = req.body;

  if (data.delivered) {
    try {
      const order = await prisma.order.update({
        where: { id: data.orderId },
        data: { delivered: data.delivered },
      });
      res.json({ message: "success" });
      return;
    } catch (e) {
      next(e);
    }
  }

  try {
    let updatedOrder;
    let updatedBook;

    if (data.operation === "add") {
      updatedOrder = await prisma.order.update({
        where: { id: data.orderId },
        data: {
          equipments: { connect: { id: data.equipmentId } },
          totalPrice: { increment: data.newPrice },
        },
      });

      updatedBook = await prisma.bookOnEquipment.create({
        data: {
          book: { connect: { id: data.bookingId } },
          equipment: { connect: { id: data.equipmentId } },
          quantity: Number(data.quantity),
        },
      });
    } else {
      updatedOrder = await prisma.order.update({
        where: { id: data.orderId },
        data: {
          equipments: { disconnect: { id: data.equipmentId } },
          totalPrice: { decrement: data.newPrice },
        },
      });

      updatedBook = await prisma.bookOnEquipment.delete({
        where: {
          equipmentId_bookId: {
            equipmentId: data.equipmentId,
            bookId: data.bookingId,
          },
        },
      });
    }

    res.json({ message: "success" });
  } catch (e) {
    next(e);
  }
}

async function getOrders(req, res, next) {
  try {
    const { skip, location } = req.query;

    if (!skip) {
      const allOrders = await prisma.order.findMany({
        include: {
          booking: true,
          equipments: { include: { bookings: true } },
          coupon: { select: { name: true } },
          // user: true,
        },
      });
      res.json(allOrders);
      return;
    }

    const orders = await prisma.order.findMany({
      where: {
        location: location === "all" || !location ? undefined : location,
      },
      include: {
        _count: {},
        user: true,
        equipments: { include: { bookings: true } },
        booking: true,
        coupon: { select: { name: true } },
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
    next(e);
  }
}

async function getOrderById(req, res, next) {
  const id = req.params;

  try {
    if (id) {
      const order = await prisma.order.findUnique({
        where: id,
        include: {
          booking: true,
          equipments: { include: { bookings: true } },
          user: true,
        },
      });

      res.json(order);
    }
  } catch (e) {
    next(e);
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
    next(e);
  }
}

module.exports = {
  postOrder,
  getOrders,
  getOrderById,
  deleteOrderById,
  putOrder,
};
