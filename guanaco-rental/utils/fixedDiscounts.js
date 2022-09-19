import { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

export const fetchFixedDiscounts = (location, token) => {
  return fetch(
    process.env.NODE_ENV === "production"
      ? `https://guanaco-rental-production.up.railway.app/fixedDiscounts?location=${location}`
      : `http://localhost:3001/fixedDiscounts?location=${location}`,
    { headers: { authorization: `${token}` } }
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const useFetchFixedDiscounts = () => {
  const [fixedDiscounts, setFixedDiscounts] = useState();
  const [loading, setLoading] = useState(true);

  const location = useSelector((state) => state.location.city);

  const { data: session } = useSession();

  const getFixedDiscounts = () => {
    fetchFixedDiscounts(location, session?.user.token)
      .then((discounts) => setFixedDiscounts(discounts))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getFixedDiscounts();
  }, [location]);

  return { fixedDiscounts, getFixedDiscounts, loading };
};
