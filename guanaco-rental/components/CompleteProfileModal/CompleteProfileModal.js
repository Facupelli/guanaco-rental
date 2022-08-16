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
        <fieldset className={s.personal_info_wrapper}>
          <div className={s.labels_wrapper}>
            <legend>INFO</legend>
            <p>Email:</p>
            <label htmlFor="fullName">Nombre Completo:</label>
            <label htmlFor="phone">Número de celular:</label>
            <label htmlFor="birthDate">Fecha de nacimiento:</label>
            <label htmlFor="address">Domicilio Real:</label>
            <label htmlFor="addressLocation">Localidad:</label>
            <label htmlFor="addressProvince">Provincia:</label>
            <label htmlFor="dniNumber">DNI:</label>
            <label htmlFor="dniFront">Foto de tu DNI (anverso):</label>
            <label htmlFor="dniBack">Foto de tu DNI (dorso):</label>
            <label htmlFor="occupation">Ocupación:</label>
            <label htmlFor="student">Estudiante:</label>
            <label htmlFor="employee">Empleado R.D:</label>
            <label htmlFor="company">Empresa:</label>
            <label htmlFor="cuit">CUIT:</label>
            <label htmlFor="bussinessName">Razón Social:</label>
          </div>

          <div className={s.inputs_wrapper}>
            <legend>-</legend>
            <p>{user.email}</p>
            <input
              required
              type="text"
              id="fullName"
              autoFocus
              {...register("fullName")}
            />
            <input required type="tel" id="phone" {...register("phone")} />
            <input
              required
              type="date"
              id="birthDate"
              {...register("birthDate")}
            />
            <input required type="text" id="address" {...register("address")} />
            <input
              required
              type="text"
              id="addressLocation"
              {...register("addressLocation")}
            />
            <input
              required
              type="text"
              id="addressProvince"
              {...register("addressProvince")}
            />
            <input
              required
              type="text"
              id="dniNumber"
              {...register("dniNumber")}
            />
            <button
              type="button"
              id="dniFront"
              onClick={() => openWidget(setDniFront)}
            >
              widget
            </button>
            <button
              type="button"
              id="dniBack"
              onClick={() => openWidget(setDniBack)}
            >
              widget
            </button>
            <input
              required
              type="text"
              id="occupation"
              {...register("occupation")}
            />
            <input type="checkbox" id="student" {...register("student")} />
            <input type="checkbox" id="employee" {...register("employee")} />
            <input type="text" id="company" {...register("company")} />
            <input required type="text" id="cuit" {...register("cuit")} />
            <input
              type="text"
              id="bussinessName"
              {...register("businessName")}
            />
          </div>
        </fieldset>

        <fieldset className={s.contacts_wrapper}>
          <legend>CONTACTOS RELACIONADOS</legend>
          <div>
            <label htmlFor="contact1">Contacto 1:</label>
            <input type="text" id="contact1" {...register("contact1")} />
            <label htmlFor="bond1">Vínculo:</label>
            <input type="text" id="bond1" {...register("bond1")} />
          </div>
          <div>
            <label htmlFor="contact2">Contacto 2:</label>
            <input type="text" id="contact2" {...register("contact2")} />
            <label htmlFor="bond2">Vínculo:</label>
            <input type="text" id="bond2" {...register("bond2")} />
          </div>
          <div>
            <label htmlFor="contact3">Contacto 3:</label>
            <input type="text" id="contact3" {...register("contact3")} />
            <label htmlFor="bond3">Vínculo:</label>
            <input type="text" id="bond3" {...register("bond3")} />
          </div>
        </fieldset>

        <fieldset className={s.bank_info_wrapper}>
          <legend>DATOS DE CUENTA BANCARIA:</legend>
          <div>
            <label htmlFor="bank">Banco:</label>
            <input type="text" id="bank" {...register("bank")} />
            <label htmlFor="alias">Alias:</label>
            <input type="text" id="alias" {...register("alias")} />
            <label htmlFor="cbu">CBU:</label>
            <input type="text" id="cbu" {...register("cbu")} />
          </div>
        </fieldset>

        <div className={s.btn_wrapper}>
          <button type="submit">siguiente</button>
        </div>
      </form>
    </div>
  );
}
