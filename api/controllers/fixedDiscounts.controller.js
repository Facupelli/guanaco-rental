const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postFixedDiscount(req, res, next) {
  const { minPrice, minDates, minUserOrders } = req.body;

  try {
    const fixedDiscount = await prisma.fixedDiscount.create({
      data: {
        minPrice: Number(minPrice),
        minDates: Number(minDates),
        minUserOrders: Number(minUserOrders),
      },
    });

    res.json({ message: "success", fixedDiscount });
  } catch (e) {
    console.log("postFixedDiscount error:", e);
  }
}

async function getFixedDiscounts(req, res, next) {
  try {
    const fixedDiscounts = await prisma.fixedDiscount.findMany({
      include: { orders: true },
    });

    res.json(fixedDiscounts);
  } catch (e) {
    console.log("getFixedDiscounts error:", e);
  }
}

module.exports = {
  getFixedDiscounts,
  postFixedDiscount,
};
