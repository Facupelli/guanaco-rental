import { useEffect } from "react";
import { useState } from "react";
import { fetchAllOrders } from "../utils/orders";

export const useFetchAllOrders = (skip) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchAllOrders(skip)
      .catch((e) => console.log(e))
      .then((res) => {
        setOrders(res.orders);
        setTotalOrders(res.count);
      })
      .finally(() => setLoading(false));
  }, [skip, fetchAllOrders]);

  const refetchOrders = () => {
    setLoading(true);
    fetchAllOrders(skip)
      .catch((e) => console.log(e))
      .then((res) => setOrders(res.orders))
      .finally(() => setLoading(false));
  };

  return { orders, totalOrders, loading, refetchOrders };
};
