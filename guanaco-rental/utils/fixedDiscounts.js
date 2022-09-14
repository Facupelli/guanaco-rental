import { useEffect } from "react";
import { useState } from "react";

export const fetchFixedDiscounts = () => {
  return fetch(
    process.env.NODE_ENV === "production"
      ? `https://guanaco-rental-production.up.railway.app/fixedDiscounts`
      : "http://localhost:3001/fixedDiscounts"
  ).then((res) => res.json());
};

export const useFetchFixedDiscounts = () => {
  const [fixedDiscounts, setFixedDiscounts] = useState();
  const [loading, setLoading] = useState(true);

  const getFixedDiscounts = () => {
    fetchFixedDiscounts()
      .catch((e) => console.e.log(e))
      .then((discounts) => setFixedDiscounts(discounts))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getFixedDiscounts();
  }, []);

  return { fixedDiscounts, getFixedDiscounts, loading };
};
