import { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

export const fetchFixedDiscounts = (token) => {
  return fetch(
    process.env.NODE_ENV === "production"
      ? `https://guanaco-rental-production.up.railway.app/fixedDiscounts`
      : "http://localhost:3001/fixedDiscounts",
    { headers: { authorization: `${token}` } }
  ).then((res) => res.json());
};

export const useFetchFixedDiscounts = () => {
  const [fixedDiscounts, setFixedDiscounts] = useState();
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  const getFixedDiscounts = () => {
    fetchFixedDiscounts(session?.user.token)
      .catch((e) => console.e.log(e))
      .then((discounts) => setFixedDiscounts(discounts))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getFixedDiscounts();
  }, []);

  return { fixedDiscounts, getFixedDiscounts, loading };
};
