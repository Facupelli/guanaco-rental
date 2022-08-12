import { useState } from "react";
import { useForm } from "react-hook-form";

import s from "./CompleteProfileModal.module.scss";

export default function CompleteProfileModal({ user }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [dniFront, setDniFront] = useState("");
  const [dniBack, setDniBack] = useState("");

  const openWidget = (setImagePublicId) => {
    // create the widget
    if (typeof window !== "undefined") {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dzjz8pe0y",
          uploadPreset: "zrp6p2qt",
          sources: ["local", "url", "camera", "dropbox", "goole_drive"],
        },
        (error, result) => {
          if (
            result.event === "success" &&
            result.info.resource_type === "image"
          ) {
            // console.log(result.info);
            setImagePublicId(result.info.public_id);
          }
        }
      );
      widget.open(); // open up the widget after creation
    }
  };

  const handleOnCLick = () => {};

  const onSubmit = async (data) => {
    console.log(data);

    const userData = JSON.stringify({
      ...data,
      email: user.email,
      dniFront,
      dniBack,
      customerAproved: false,
      petitionSent: true,
    });

    const newCustomerPetition = await fetch("http://localhost:3001/users", {
      method: "POST",
      body: userData,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => console.log(response.json()));
  };

  return (
    <div className={s.container}>
      <h1>FORMULARIO ALTA DE CLIENTE </h1>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.personal_info_wrapper}>
          <div className={s.labels_wrapper}>
            <p>Email:</p>
            <label>Nombre Completo:</label>
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
            <input type="text" {...register("fullName")} />
            <input type="text" {...register("phone")} />
            <input type="date" {...register("birthDate")} />
            <input type="text" {...register("address")} />
            <input type="text" {...register("addressLocation")} />
            <input type="text" {...register("addressProvince")} />
            <button type="button" onClick={() => openWidget(setDniFront)}>
              widget
            </button>
            <button type="button" onClick={() => openWidget(setDniBack)}>
              widget
            </button>
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
            <label>Contacto 1:</label>
            <input type="text" {...register("contact1")} />
            <label>Vínculo:</label>
            <input type="text" {...register("bond1")} />
          </div>
          <div>
            <label>Contacto 2:</label>
            <input type="text" {...register("contact2")} />
            <label>Vínculo:</label>
            <input type="text" {...register("bond2")} />
          </div>
          <div>
            <label>Contacto 3:</label>
            <input type="text" {...register("contact3")} />
            <label>Vínculo:</label>
            <input type="text" {...register("bond3")} />
          </div>
        </div>

        <div className={s.bank_info_wrapper}>
          <p>DATOS DE CUENTA BANCARIA:</p>
          <div>
            <label>Banco:</label>
            <input type="text" {...register("bank")} />
            <label>Alias:</label>
            <input type="text" {...register("alias")} />
            <label>CBU:</label>
            <input type="text" {...register("cbu")} />
          </div>
        </div>

        <div className={s.btn_wrapper}>
          <button type="submit">siguiente</button>
        </div>
      </form>
    </div>
  );
}
