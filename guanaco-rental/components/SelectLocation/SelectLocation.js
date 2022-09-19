import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setShowModal,
} from "../../redux/features/location/locationSlice";

import s from "./SelectLoaction.module.scss";

export default function SelectLoaction() {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");

  const location = useSelector((state) => state.location.city);

  useEffect(() => {
    if (city) {
      dispatch(setLocation(city));
      dispatch(setShowModal(false));
    }
  }, [city, dispatch]);

  return (
    <div className={s.container}>
      <label>Ciudad:</label>
      <select defaultValue={location} onChange={(e) => setCity(e.target.value)}>
        <option value="">seleccionar</option>
        <option value="San Juan">SAN JUAN</option>
        <option value="Mendoza">MENDOZA</option>
      </select>
    </div>
  );
}
