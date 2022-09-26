import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export const fetchCoupons = (location) => {
  return fetch(
    process.env.NODE_ENV === "production"
      ? `https://www.guanacorental.shop/rentalapi/coupons?location=${location}`
      : `http://localhost:3001/coupons?location=${location}`
  ).then((res) => res.json());
};

export const useFetchCoupons = () => {
  const [coupons, setCoupons] = useState({});
  const [loading, setLoading] = useState(true);

  const location = useSelector((state) => state.location.city);

  const getCoupons = () => {
    setLoading(true);
    fetchCoupons(location)
      .then((coupons) => setCoupons(coupons))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getCoupons();
  }, [location]);

  return { coupons, loading, getCoupons };
};

export const fetchCoupon = (couponName, location) => {
  return fetch(
    process.env.NODE_ENV === "production"
      ? `https://www.guanacorental.shop/rentalapi/coupons/${couponName}?location=${location}`
      : `http://localhost:3001/coupons/${couponName}?location=${location}`
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const handleApplyCoupon = (couponName, setCouponApplied, location) => {
  setCouponApplied((prev) => ({ ...prev, error: "", loading: true }));

  fetchCoupon(couponName, location)
    .catch((e) => console.log("apply coupon error:", e))
    .then((coupon) => {
      if (coupon?.message === "success") {
        setCouponApplied((prev) => ({
          ...prev,
          success: true,
          coupon: coupon.coupon,
          loading: false,
        }));
      } else {
        setCouponApplied((prev) => ({
          success: false,
          coupon: {},
          error: coupon?.message,
          loading: false,
        }));
      }
    });
};

export const handleDeleteCoupon = async (couponId, getCoupons, token) => {
  try {
    const response = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/coupons/${couponId}`
        : `http://localhost:3001/coupons/${couponId}`,
      {
        method: "DELETE",
        headers: { authorization: `${token}` },
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
