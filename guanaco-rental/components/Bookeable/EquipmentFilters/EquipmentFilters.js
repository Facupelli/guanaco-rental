import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setEquipment } from "../../../redux/features/equipment/equipmentSlice";

import s from "./EquipmentFilters.module.scss";

export default function EquipmentFilters({ setFilters }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const category = watch("category");

  console.log(category);

  const getEquipment = async () => {
    const equipment = await fetch(
      `http://localhost:3001/equipment?category=${category}`
    )
      .then((response) => response.json())
      .catch((e) => console.log("fecth error:", e));
    dispatch(setEquipment(equipment));
  };

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category }));
    if (category) {
      getEquipment();
    }
  }, [category]);

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select defaultValue="all" {...register("category")}>
          <option value="all">TODOS</option>
          <option value="camaras">CAMARAS</option>
          <option value="lentes">LENTES</option>
          <option value="monitores">MONITORES</option>
          <option value="estabilizadores">ESTABILIZADORES/TRIPODES</option>
          <option value="iluminacion">ILUMINACION</option>
          <option value="sonido">SONIDO</option>
          <option value="grip">GRIP</option>
          <option value="otros">OTROS</option>
          <option value="drones">DRONES</option>
        </select>
      </form>
    </section>
  );
}
