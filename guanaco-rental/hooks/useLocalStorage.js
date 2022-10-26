import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/features/cart/cartSlice";
import {
  setLocation,
  setShowModal,
} from "../redux/features/location/locationSlice";

let didCartInit = false;
let didLocationInit = false;

export const useLoadCartFromLocalStorage = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (!didCartInit) {
      didCartInit = true;

      if (cart?.length === 0) {
        const localCart = localStorage.getItem("cart");
        if (localCart) {
          dispatch(setCart(JSON.parse(localCart)));
        }
      }
    }
  }, [cart.length, dispatch]);

  return;
};

export const useLoadLocationFromLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!didLocationInit) {
      didLocationInit = true;

      const localLocation = localStorage.getItem("location");

      if (localLocation) {
        dispatch(setLocation(localLocation));
      } else {
        dispatch(setShowModal(true));
      }
    }
  }, [dispatch]);

  return;
};
