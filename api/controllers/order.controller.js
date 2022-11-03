const { PrismaClient } = require("@prisma/client");
const { areAllItemsAvailable } = require("../utils/isItemAvailable");
const { sendMail } = require("../utils/mailer");
const { getOwnerEarningsByOrder } = require("../utils/orderEarnings");
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
        pickupDay: new Date(`${data.dates[0]} 00:00:01`),
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
      originalTotalPrice: data.originalTotalPrice,
      booking: { connect: { id: book.id } },
      location: data.location,
      message: data.message,
    };

    if (data.couponId) {
      newData.coupon = { connect: { id: data.couponId } };
    }

    if (data.discountApplied) {
      newData.fixedDiscount = { connect: { id: data.discountApplied } };
    }

    newOrder = await prisma.order.create({
      data: newData,
      include: {
        booking: true,
        fixedDiscount: true,
        equipments: { include: { bookings: true } },
        coupon: { select: { name: true, discount: true } },
      },
    });
  } catch (e) {
    const bookDeleted = await prisma.book.delete({ where: { id: book.id } });
    next(e);
  }

  // CREATE ORDER EARNINGS AND CONNECT
  try {
    const eachEarnings = getOwnerEarningsByOrder(newOrder);

    const orderEarnings = await prisma.orderEarnings.create({
      data: {
        order: { connect: { id: newOrder.id } },
        federico: eachEarnings.totalFederico ?? 0,
        oscar: eachEarnings.totalOscar ?? 0,
        sub: eachEarnings.totalSub ?? 0,
      },
    });

    res.json({ message: "success", newOrder });
  } catch (e) {
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
    console.log(mailSentToGuanaco);
    console.log(mailSentToClient);

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

  if (data.newOrderDiscount) {
    const orderToUpdate = await prisma.order.findUnique({
      where: { id: data.orderId },
      select: { totalPrice: true },
    });

    const orderEarningsToUpdate = await prisma.orderEarnings.findUnique({
      where: { orderId: data.orderId },
      select: { federico: true, oscar: true, sub: true },
    });

    const newTotalPrice =
      orderToUpdate.totalPrice -
      orderToUpdate.totalPrice * (Number(data.newOrderDiscount) / 100);
    try {
      const order = await prisma.order.update({
        where: { id: data.orderId },
        data: {
          totalPrice: Math.round(newTotalPrice),
          adminDiscount: true,
          adminDiscountValue: Number(data.newOrderDiscount),
        },
      });

      const newFederico =
        orderEarningsToUpdate.federico -
        (orderEarningsToUpdate.federico * (data.newOrderDiscount / 100) || 0);
      const newOscar =
        orderEarningsToUpdate.oscar -
        (orderEarningsToUpdate.oscar * (data.newOrderDiscount / 100) || 0);
      const newSub =
        orderEarningsToUpdate.sub -
        (orderEarningsToUpdate.newSub * (data.newOrderDiscount / 100) || 0);

      const updatedOrderEarnings = await prisma.orderEarnings.update({
        where: { orderId: data.orderId },
        data: {
          federico: newFederico,
          oscar: newOscar,
          sub: newSub,
        },
      });

      res.json({ message: "success" });
      return;
    } catch (e) {
      next(e);
    }
    return;
  }

  try {
    let updatedOrder;
    let updatedBook;

    if (data.operation === "add") {
      updatedBook = await prisma.bookOnEquipment.create({
        data: {
          book: { connect: { id: data.bookingId } },
          equipment: { connect: { id: data.equipmentId } },
          quantity: Number(data.quantity),
        },
      });

      updatedOrder = await prisma.order.update({
        where: { id: data.orderId },
        data: {
          equipments: { connect: { id: data.equipmentId } },
          totalPrice: { increment: data.newPrice },
          originalTotalPrice: { increment: data.newPrice },
        },
        include: {
          booking: true,
          fixedDiscount: true,
          equipments: { include: { bookings: true } },
          coupon: { select: { name: true, discount: true } },
        },
      });

      const eachEarnings = getOwnerEarningsByOrder(updatedOrder);

      const orderEarnings = await prisma.orderEarnings.update({
        where: { orderId: updatedOrder.id },
        data: {
          federico: eachEarnings.totalFederico ?? 0,
          oscar: eachEarnings.totalOscar ?? 0,
          sub: eachEarnings.totalSub ?? 0,
        },
      });
    } else {
      updatedOrder = await prisma.order.update({
        where: { id: data.orderId },
        data: {
          equipments: { disconnect: { id: data.equipmentId } },
          totalPrice: { decrement: data.newPrice },
          originalTotalPrice: { decrement: data.newPrice },
        },
        include: {
          booking: true,
          fixedDiscount: true,
          equipments: { include: { bookings: true } },
          coupon: { select: { name: true, discount: true } },
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

      const eachEarnings = getOwnerEarningsByOrder(updatedOrder);

      const orderEarnings = await prisma.orderEarnings.update({
        where: { orderId: updatedOrder.id },
        data: {
          federico: eachEarnings.totalFederico ?? 0,
          oscar: eachEarnings.totalOscar ?? 0,
          sub: eachEarnings.totalSub ?? 0,
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
          coupon: { select: { name: true, discount: true } },
          orderEarnings: true,
          fixedDiscount: true,
        },
      });
      res.json(allOrders);
      return;
    }

    let orderByPipeline = {};
    let wherePipeline = {
      location: location === "all" || !location ? undefined : location,
    };

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (order === "desc" || !order) {
      orderByPipeline.createdAt = "desc";
    }
    if (order === "booking") {
      orderByPipeline.booking = {
        pickupDay: "asc",
      };
      wherePipeline.booking = {
        pickupDay: { gte: yesterday },
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
        orderEarnings: true,
        fixedDiscount: true,
      },
      orderBy: orderByPipeline,
      skip: Number(skip),
      take: 10,
    });

    const count = await prisma.order.count({
      where: wherePipeline,
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
          fixedDiscount: true,
          orderEarnings: true,
          coupon: true,
        },
      });

      res.json(order);
    }
  } catch (e) {
    next(e);
  }
}

async function deleteOrderById(req, res, next) {
  const { id } = req.params;

  const bookId = id.split("-")[0];
  const orderId = id.split("-")[1];

  try {
    if (id) {
      const orderEarnings = await prisma.orderEarnings.findMany({
        where: {
          orderId,
        },
      });
      if (orderEarnings.length > 0) {
        const deletedOrderEarnings = await prisma.orderEarnings.delete({
          where: {
            orderId: orderId,
          },
        });
      }

      const deletedOrder = await prisma.book.delete({
        where: { id: bookId },
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
