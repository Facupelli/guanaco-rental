import { useForm } from "react-hook-form";

import s from "./CompleteProfileModal.module.scss";

export default function CompleteProfileModal({ user }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleOnCLick = () => {};

  const onSubmit = (data) => console.log(data);

  return (
    <div className={s.container}>
      <h1>FORMULARIO ALTA DE CLIENTE </h1>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.labels_wrapper}>
          <p>Email:</p>
          <label>Número de celular:</label>
          <label>Fecha de nacimiento:</label>
          <label>Domicilio Real:</label>
          <label>Localidad:</label>
          <label>Provincia:</label>
          <label>Foto de tu DNI (anverso):</label>
          <label>Foto de tu DNI (dorso):</label>
          <label>Ocupación:</label>
          <label>Estudiante:</label>
          <label>Empleado R.D:</label>
          <label>Empresa:</label>
          <label>CUIT:</label>
          <label>Razón Social:</label>
        </div>
        <div className={s.inputs_wrapper}>
          <p>{user.email}</p>
          <input type="text" {...register("phoneNumber")} />
          <input type="date" {...register("birth_date")} />
          <input type="text" {...register("addres")} />
          <input type="text" {...register("addres_location")} />
          <input type="text" {...register("addres_province")} />
          <input type="file" {...register("dniPhoto.front")} />
          <input type="file" {...register("dniPhoto.back")} />
          <input type="text" {...register("occupation")} />
          <input type="checkbox" {...register("student")} />
          <input type="checkbox" {...register("dependecy_relation")} />
          <input type="text" {...register("company")} />
          <input type="text" {...register("cuit")} />
          <input type="text" {...register("business_name")} />
        </div>
        <div className={s.btn_wrapper}>
          <button type="button" onClick={handleOnCLick}>
            siguiente
          </button>
        </div>
      </form>
    </div>
  );
}
