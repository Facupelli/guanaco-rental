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
    next(e);
  }
}

async function getCoupons(req, res, next) {
  const { location } = req.query;
  try {
    const coupons = await prisma.coupon.findMany({
      where: {
        location: location === "all" || !location ? undefined : location,
      },
      include: { orders: true },
    });

    let finishedCoupons = [];
    let activeCoupons = [];

    coupons.map((coupon) => {
      if (
        (coupon.maxOrders && coupon.orders.length >= coupon.maxOrders) ||
        (coupon.expirationDate &&
          new Date().getTime() > new Date(coupon.expirationDate).getTime())
      ) {
        finishedCoupons.push(coupon);
      } else {
        activeCoupons.push(coupon);
      }
    });

    res.json({ finishedCoupons, activeCoupons });
  } catch (e) {
    next(e);
  }
}

async function getCouponByName(req, res, next) {
  const name = req.params;
  try {
    if (name) {
      const coupon = await prisma.coupon.findUnique({
        where: name,
        include: { orders: true },
      });

      if (!coupon) {
        res.json({ message: "cupón inválido" });
        return;
      }

      if (
        (coupon.maxOrders && coupon.orders.length >= coupon.maxOrders) ||
        (coupon.expirationDate &&
          new Date().getTime() > new Date(coupon.expirationDate).getTime())
      ) {
        res.json({ message: "cupón inválido" });
      } else {
        res.json({ message: "success", coupon });
      }
    }
  } catch (e) {
    next(e);
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
    next(e);
  }
}

module.exports = {
  postCoupon,
  getCoupons,
  deleteCouponById,
  getCouponByName,
};
