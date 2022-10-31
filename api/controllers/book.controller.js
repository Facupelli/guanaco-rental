const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getBookingsByDate(req, res, next) {
  const { date, location } = req.query;

  try {
    if (date) {
      const bookings = await prisma.book.findMany({
        where: {
          dates: {
            has: date,
          },
          // order: {
          //   location: location === "all" || !location ? undefined : location,
          // },
        },
        include: {
          order: {
            include: {
              booking: true,
              equipments: { include: { bookings: true } },
              coupon: { select: { name: true, discount: true } },
              orderEarnings: true,
              fixedDiscount: true,
              user: true,
            },
          },
        },
      });

      res.json(bookings);
    } else {
      const bookings = await prisma.book.findMany({
        where: {
          order: {
            location: location === "all" || !location ? undefined : location,
          },
        },
      });

      res.json(bookings);
    }
  } catch (e) {
    next(e);
  }
}

module.exports = { getBookingsByDate };
