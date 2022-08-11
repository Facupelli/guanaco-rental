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
        <div className={s.personal_info_wrapper}>
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
            <input type="date" {...register("birthDate")} />
            <input type="text" {...register("addres")} />
            <input type="text" {...register("addresLocation")} />
            <input type="text" {...register("addresProvince")} />
            <input type="file" {...register("dniPhoto.front")} />
            <input type="file" {...register("dniPhoto.back")} />
            <input type="text" {...register("occupation")} />
            <input type="checkbox" {...register("student")} />
            <input type="checkbox" {...register("employee")} />
            <input type="text" {...register("company")} />
            <input type="text" {...register("cuit")} />
            <input type="text" {...register("businessName")} />
          </div>
        </div>

        <div className={s.contacts_wrapper}>
          <p>CONTACTOS RELACIONADOS:</p>
          <div>
            <label>Contacto 1</label>
            <input type="text" {...register("contact1")} />
            <label>Vínculo:</label>
            <input type="text" {...register("bond1")} />
          </div>
          <div>
            <label>Contacto 2</label>
            <input type="text" {...register("contact2")} />
            <label>Vínculo:</label>
            <input type="text" {...register("bond2")} />
          </div>
          <div>
            <label>Contacto 3</label>
            <input type="text" {...register("contact3")} />
            <label>Vínculo:</label>
            <input type="text" {...register("bond3")} />
          </div>
        </div>

        <div className={s.bank_info_wrapper}>
          <p>DATOS DE CUENTA BANCARIA:</p>
          <div>
            <label>Banco</label>
            <input type="text" {...register("bankName")} />
            <label>Alias</label>
            <input type="text" {...register("bankAlias")} />
            <label>CBU</label>
            <input type="text" {...register("bankCBU")} />
          </div>
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
