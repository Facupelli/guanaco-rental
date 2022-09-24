import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../../redux/features/cart/cartSlice";
import {
  setLocation,
  setShowModal,
} from "../../redux/features/location/locationSlice";

import s from "./SelectLoaction.module.scss";

export default function SelectLoaction({ adminPanel }) {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");

  const location = useSelector((state) => state.location.city);

  useEffect(() => {
    if (city) {
      dispatch(setLocation(city));
      dispatch(setShowModal(false));

      //locastorage
      const localLocation = localStorage.getItem("location")
      if(localLocation &&  localLocation !== city){
        dispatch(cleanCart())
        localStorage.removeItem("cart")
      }
      localStorage.setItem("location", city)
    }
  }, [location, city, dispatch]);

  return (
    <div className={s.container}>
      <label>Sucursal:</label>
      <select
        onChange={(e) => setCity(e.target.value)}
        value={location}
      >
        <option disabled value="">
          seleccionar
        </option>
        {adminPanel && <option value="all">TODAS</option>}
        <option value="SAN_JUAN">SAN JUAN</option>
        <option value="MENDOZA">MENDOZA</option>
      </select>
    </div>
  );
}
