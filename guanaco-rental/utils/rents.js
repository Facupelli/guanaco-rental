import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const fetchOrders = (location, token) => {
  return fetch(
    process.env.NODE_ENV === "production"
      ? `https://www.guanacorental.shop/rentalapi/order?location=${location}`
      : `http://localhost:3001/order?location=${location}`,
    { headers: { authorization: `${token}` } }
  )
    .then((res) => res.json())
    .catch((e) => console.log("fecth error:", e));
};

const fetchTotalPrice = (location, token) => {
  return fetch(
    process.env.NODE_ENV === "production"
      ? `https://www.guanacorental.shop/rentalapi/rents?location=${location}`
      : `http://localhost:3001/rents?location=${location}`,
    { headers: { authorization: `${token}` } }
  )
    .then((res) => res.json())
    .catch((e) => console.log("fecth error:", e));
};

export const useFetchRents = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  // const [totalPrice, setTotalPrice] = useState();

  const location = useSelector((state) => state.location.city);

  const { data: session } = useSession();

  useEffect(() => {
    setLoading(true);
    fetchOrders(location, session?.user.token).then((ordersList) => {
      const filteredOrders = ordersList.filter((order) => {
        const lastRentDayTime = new Date(
          order.booking.dates[order.booking.dates.length - 1]
        ).getTime();

        return new Date("1/1/2023").getTime() < lastRentDayTime;
      });
      setOrders(filteredOrders);
      setLoading(false);
    });
    // fetchTotalPrice(location, session?.user.token)
    //   .then((total) => setTotalPrice(total._sum.totalPrice))
    //   .then(() => setLoading(false));
  }, [location]);

  const totalPrice = orders?.reduce((acc, curr) => {
    return acc + curr.totalPrice;
  }, 0);

  return { orders, totalPrice, loading };
};
