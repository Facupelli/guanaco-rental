const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getBookingsByDate(req, res, next) {
  const { date } = req.query;

  try {
    if (date) {
      const bookings = await prisma.book.findMany({
        where: {
          dates: {
            has: date,
          },
        },
        include: {
          order: {
            select: {
              equipments: true,
              totalPrice: true,
              number: true,
            },
          },
        },

        //   include: { order: { include: { equipments: true } } },
      });

      res.json(bookings);
    } else {
      const bookings = await prisma.book.findMany();

      res.json(bookings);
    }
  } catch (e) {
    console.log(e);
    return;
  }
}

module.exports = { getBookingsByDate };
