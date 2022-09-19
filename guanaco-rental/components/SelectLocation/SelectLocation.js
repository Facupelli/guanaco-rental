import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setLocation,
  setShowModal,
} from "../../redux/features/location/locationSlice";

import s from "./SelectLoaction.module.scss";

export default function SelectLoaction() {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");

  useEffect(() => {
    if (city) {
      dispatch(setLocation(city));
      dispatch(setShowModal(false));
    }
  }, [city, dispatch]);

  return (
    <div className={s.container}>
      <h3>EN DONDE QUIERES ALQUILAR LOS EQUIPOS</h3>
      <div>
        <label>CIUDAD:</label>
        <select onChange={(e) => setCity(e.target.value)}>
          <option value="">seleccionar</option>
          <option value="san-juan">SAN JUAN</option>
          <option value="mendoza">MENDOZA</option>
        </select>
      </div>
    </div>
  );
}
