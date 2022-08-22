import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchEquipment } from "../../../redux/features/equipment/equipmentSlice";
import s from "./EquipmentSearchBar.module.scss";

export default function EquipmentSearchBar({filters}) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const search = watch("search");

  useEffect(() => {
    if (search) {
      dispatch(fetchEquipment(filters.category, null, search));
    }
  }, [search]);

  return (
    <form className={s.form}>
      <input type="text" placeholder="Buscar equipos" {...register("search")}/>
    </form>
  );
}
