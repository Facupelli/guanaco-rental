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

  //date = [8/25/2022,8/26/2022,8/27/2022]
  //cart= [{id,qty},{id,qty},{id.qty}]

  const equipmentsIds = data.cart.map((item) => ({ id: item.id }));

  // await prisma.$transaction(
  //   data.cart.map((item) =>
  //     prisma.book.create({
  //       data: {
  //         quantity: item.quantity,
  //         equipment: { connect: { id: item.id } },
  //         date: data.date,
  //       },
  //     })
  //   )
  // );

  await prisma.$transaction(
    data.cart.map((item) =>
      prisma.equipment.update({
        where: { id: item.id },
        data: {
          bookings: {
            create: {
              quantity: item.quantity,
              date: data.date,
            },
          },
        },
      })
    )
  );

  // const newOrder = await prisma.order.create({
  //   data: {
  //     userId: data.userId,
  //     equipments: { connect: data.equipmentsIds },
  //     totalPrice: data.totalPrice,
  //   },
  // });

  res.json("success");
}

module.exports = { postOrder };
