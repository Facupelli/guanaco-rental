import { useEffect } from "react";
import { useState } from "react";
import { fetchAllOrders } from "../utils/orders";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

export const useFetchAllOrders = (skip) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);

  const { data: session } = useSession();

  const employeeLocation = useSelector(
    (state) => state.user.data.addressProvince
  );
  const location = useSelector((state) => state.location.city);

  useEffect(() => {
    setLoading(true);
    fetchAllOrders(
      session.user.role === "EMPLOYEE" ? employeeLocation : location,
      skip,
      session?.user.token
    )
      .then((res) => {
        setOrders(res.orders);
        setTotalOrders(res.count);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [location, skip, fetchAllOrders]);

  const refetchOrders = () => {
    setLoading(true);
    fetchAllOrders(
      session.user.role === "EMPLOYEE" ? employeeLocation : location,
      skip,
      session?.user.token
    )
      .then((res) => setOrders(res.orders))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  return { orders, totalOrders, loading, refetchOrders };
};
