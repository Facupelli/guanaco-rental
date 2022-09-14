import { useEffect } from "react";
import { useState } from "react";

export const fetchCoupons = () => {
  return fetch(
    process.env.NODE_ENV === "production"
      ? `https://guanaco-rental-production.up.railway.app/coupons`
      : "http://localhost:3001/coupons"
  ).then((res) => res.json());
};

export const useFetchCoupons = () => {
  const [coupons, setCoupons] = useState({});
  const [loading, setLoading] = useState(true);

  const getCoupons = () => {
    setLoading(true);
    fetchCoupons()
      .catch((e) => console.log(e))
      .then((coupons) => setCoupons(coupons))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getCoupons();
  }, []);

  return { coupons, loading, getCoupons };
};

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

export const handleDeleteCoupon = async (couponId, getCoupons) => {
  try {
    const response = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://guanaco-rental-production.up.railway.app/coupons/${couponId}`
        : `http://localhost:3001/coupons/${couponId}`,
      {
        method: "DELETE",
      }
    );
    const deletedCoupon = await response.json();
    if (deletedCoupon.message === "success") {
      getCoupons();
    }
  } catch (e) {
    console.log("delete coupon error:", e);
  }
};
