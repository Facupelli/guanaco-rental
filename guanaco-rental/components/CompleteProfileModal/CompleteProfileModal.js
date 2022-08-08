import { useForm } from "react-hook-form";

import s from "./CompleteProfileModal.module.scss";

export default function CompleteProfileModal({ user, setShowCompleteProfile }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const handleOnCLick = () => {
    setShowCompleteProfile(false);
  };

  return (
    <div className={s.modal_container}>
      <h1>AGENDAR PEDIDO</h1>
      <form className={s.form}>
        <div className={s.labels_wrapper}>
          <p>Email:</p>
          <label>Número de celular:</label>
          <label>Foto de tu DNI (dorso):</label>
          <label>Foto de tu DNI (revés):</label>
        </div>
        <div className={s.inputs_wrapper}>
          <p>{user.email}</p>
          <input type="text" {...register("phoneNumber")} />
          <input type="file" {...register("dniPhoto.0")} />
          <input type="file" {...register("dniPhoto.1")} />
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
