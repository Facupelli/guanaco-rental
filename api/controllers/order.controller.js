const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postOrder(req, res, next) {
  const data = req.body;

  // data.bookings
  // [{date, quantity, equipment}]

   // {
  //   date: "8/12/2022",
  //   equipmentId: "asd"
  // }

  // {
  //   date: "8/12/2022",
  //   equipmentId: "asd"
  // }
   // {
  //   date: "8/13/2022",
  //   equipmentId: "asd"
  // }
   // {
  //   date: "8/14/2022",
  //   equipmentId: "asd"
  // }

  const newBookDate = await prisma.book.createMany({
    data: data.bookings
  })

  // const newOrder = await prisma.order.create({
  //   data: {
  //     userId: data.userId,
  //     equipments: { connect: data.equipmentsIds },
  //     totalPrice: data.totalPrice,
  //   },
  // });

  res.json(newBookDate);
}

module.exports = { postOrder };
