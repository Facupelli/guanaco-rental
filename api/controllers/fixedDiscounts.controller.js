const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postFixedDiscount(req, res, next) {
  const { minPrice, minDates, minUserOrders, discount, name } = req.body;

  try {
    const fixedDiscount = await prisma.fixedDiscount.create({
      data: {
        name: name,
        minPrice: minPrice ? Number(minPrice) : null,
        minDates: minDates ? Number(minDates) : null,
        minUserOrders: minUserOrders ? Number(minUserOrders) : null,
        discount: Number(discount),
      },
    });

    res.json({ message: "success", fixedDiscount });
  } catch (e) {
    next(e);
  }
}

async function putFixedDiscount(req, res, next) {
  const { minPrice, minDates, minUserOrders, discount, id } = req.body;

  try {
    const fixedDiscount = await prisma.fixedDiscount.update({
      where: { id },
      data: {
        minPrice: Number(minPrice),
        minDates: Number(minDates),
        minUserOrders: Number(minUserOrders),
        discount: Number(discount),
      },
    });

    res.json({ message: "success", fixedDiscount });
  } catch (e) {
    next(e);
  }
}

async function getFixedDiscounts(req, res, next) {
  try {
    const fixedDiscounts = await prisma.fixedDiscount.findMany({
      include: { orders: true },
    });

    res.json(fixedDiscounts);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getFixedDiscounts,
  postFixedDiscount,
  putFixedDiscount,
};
