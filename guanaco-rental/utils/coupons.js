export const fetchCoupon = (couponName) => {
  return fetch(
    process.env.NODE_ENV === "production"
      ? `https://guanaco-rental-production.up.railway.app/coupons/${couponName}`
      : `http://localhost:3001/coupons/${couponName}`
  )
    .catch((e) => console.log(e))
    .then((res) => res.json());
};

export const handleApplyCoupon = (couponName, setCouponApplied) => {
  setCouponApplied((prev) => ({ ...prev, error: "" }));

  fetchCoupon(couponName)
    .catch((e) => console.log("apply coupon error:", e))
    .then((coupon) => {
      if (coupon.message === "success") {
        setCouponApplied((prev) => ({
          ...prev,
          success: true,
          coupon: coupon.coupon,
        }));
      } else {
        setCouponApplied((prev) => ({
          success: false,
          coupon: {},
          error: coupon.message,
        }));
      }
    });
};
