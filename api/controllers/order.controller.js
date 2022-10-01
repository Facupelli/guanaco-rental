const { PrismaClient } = require("@prisma/client");
const { areAllItemsAvailable } = require("../utils/isItemAvailable");
const { sendMail } = require("../utils/mailer");
const { sendWsMessage } = require("../utils/whatsapp");
const prisma = new PrismaClient();

async function postOrder(req, res, next) {
  const data = req.body;

  let newCart;
  try {
    //get most recent bookings for cart
    const updatedCart = await prisma.$transaction(
      data.cart.map((cartItem) =>
        prisma.equipment.findUnique({
          where: { id: cartItem.id },
          include: { bookings: { include: { book: true } } },
        })
      )
    );

    newCart = data.cart.map((item) => {
      if (!item.quantity) {
        return { ...updatedCart.find((el) => el.id === item.id), quantity: 1 };
      }
      return {
        ...updatedCart.find((el) => el.id === item.id),
        quantity: item.quantity,
      };
    });

    //check availability for dates
    if (!areAllItemsAvailable(newCart, data.dates)) {
      res.json({
        error: true,
        message: "some equipment is booked for that date, refresh page",
      });
      return;
    }
  } catch (e) {
    res.json({
      message: "error when checking bookings for equipment",
      error: e,
    });
    return;
  }

  let book;

  // CREATE BOOK & CREATE BOOKONEQUIPMENT FOR EVERY GEAR
  try {
    book = await prisma.book.create({
      data: {
        dates: data.dates,
        pickupHour: data.pickupHour,
        pickupDay: new Date(data.dates[0]),
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
    const CLIENT_EMAIL = process.env.CLIENT_MAIL;

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

    const equipment = orderData.equipments.map(
      (gear) =>
        `${gear.name} ${gear.brand} ${gear.model} x${
          gear.bookings.filter(
            (book) => book.bookId === orderData.booking.id
          )[0].quantity
        }`
    );

    const mailToClient = {
      from: `Guanaco Rental <${CLIENT_EMAIL}>`,
      to: `${orderData.user.email}`,
      subject: `PEDIDO RECIBIDO`,
      template: "orderSuccessToClient",
      context: {
        fullName: `${orderData.user.fullName}`,
        pickupHour: `${orderData.booking.pickupHour}`,
        pickupDay: `${new Date(orderData.booking.dates[0]).toLocaleDateString(
          "es-AR"
        )}`,
        returnDay: `${new Date(
          orderData.booking.dates[orderData.booking.dates.length - 1]
        ).toLocaleDateString("es-AR")}`,
        totalPrice: `${orderData.totalPrice}`,
        equipment,
      },
    };

    const mailToGuanaco = {
      from: `Guanaco Rental <${CLIENT_EMAIL}>`,
      to: "hola@guanacorental.com",
      subject: `NUEVO PEDIDO`,
      template: "orderSuccessTemplate",
      context: {
        number: `${orderData.number}`,
        location: `${orderData.location}`,
        name: `${orderData.user.fullName}`,
        phone: `${orderData.user.phone}`,
        email: `${orderData.user.email}`,
        dates: `${orderData.booking.dates
          .map((date) => new Date(date).toLocaleDateString("es-AR"))
          .join(", ")}`,
        totalPrice: orderData.totalPrice,
        equipment,
      },
    };

    const mailSentToGuanaco = await sendMail(mailToGuanaco);
    const mailSentToClient = await sendMail(mailToClient);

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
    const { skip, location, order } = req.query;

    if (!skip) {
      const allOrders = await prisma.order.findMany({
        where: {
          location: location === "all" || !location ? undefined : location,
          totalPrice: { gt: 0 },
        },
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

    let orderByPipeline = {};
    let wherePipeline = {
      location: location === "all" || !location ? undefined : location,
    };

    if (order === "desc" || !order) {
      orderByPipeline.createdAt = "desc";
    }
    if (order === "booking") {
      orderByPipeline.booking = {
        pickupDay: "asc",
      };
      wherePipeline.booking = {
        pickupDay: { gte: new Date() },
      };
    }

    const orders = await prisma.order.findMany({
      where: wherePipeline,
      include: {
        _count: {},
        user: true,
        equipments: { include: { bookings: true } },
        booking: true,
        coupon: { select: { name: true } },
      },
      orderBy: orderByPipeline,
      skip: Number(skip),
      take: 10,
    });

    const count = await prisma.order.count({
      where: {
        location: location === "all" || !location ? undefined : location,
      },
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
        include: {
          order: {
            select: { user: { select: { fullName: true, email: true } } },
          },
        },
      });

      const CLIENT_EMAIL = process.env.CLIENT_MAIL;

      const mailToClient = {
        from: `Guanaco Rental <${CLIENT_EMAIL}>`,
        to: `${deletedOrder.order.user.email}`,
        subject: `PEDIDO CANCELADO`,
        template: "orderDeletedToClient",
        context: {
          fullName: `${deletedOrder.order.user.fullName}`,
        },
      };

      const sendMailToClient = sendMail(mailToClient);

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
