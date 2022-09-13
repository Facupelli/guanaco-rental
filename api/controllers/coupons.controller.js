const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function postCoupon(req, res, next) {
  const { name, discount, expirationDate, maxOrders } = req.body;

  try {
    const coupon = await prisma.coupon.create({
      data: {
        name,
        discount: Number(discount),
        expirationDate: new Date(expirationDate),
        maxOrders: Number(maxOrders),
      },
    });

    res.json({ message: "success", coupon });
  } catch (e) {
    console.log("postCoupon error:", e);
  }
}

async function getCoupons(req, res, next) {
  try {
    const coupons = await prisma.coupon.findMany({
      include: { orders: true },
    });

    let finishedCoupons = [];
    let activeCoupons = [];

    
    coupons.map((coupon) => {
      if (
        (coupon.maxOrders && coupon.orders.length >= coupon.maxOrders) ||
        (coupon.expirationDate && new Date().getTime() > new Date(coupon.expirationDate).getTime())
      ) {
        finishedCoupons.push(coupon);
      } else {
        activeCoupons.push(coupon);
      }
    });

    res.json({ finishedCoupons, activeCoupons });
  } catch (e) {
    console.log("getCoupons error:", e);
  }
}

async function deleteCouponById(req, res, next) {
  const id = req.params;
  try {
    if (id) {
      const couponDeleted = await prisma.coupon.delete({
        where: id,
      });

      res.json({ message: "success", couponDeleted });
    } else {
      console.log("missing id");
    }
  } catch (e) {
    console.log("getCoupons error:", e);
  }
}

module.exports = {
  postCoupon,
  getCoupons,
  deleteCouponById,
};
