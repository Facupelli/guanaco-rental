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

  console.log(dniBack);

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
            console.log("RESULT", result.info);
            setImagePublicId(result.info.secure_url);
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

    if (newCustomerPetition.message === "success") {
      console.log("success");
    }
  };

  return (
    <div className={s.container}>
      <h1>FORMULARIO ALTA DE CLIENTE </h1>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={s.personal_info_wrapper}>
          <legend>INFORMACION CLIENTE</legend>

          <div className={s.inputs}>
            <label htmlFor="fullName">Nombre Completo:</label>
            <input
              required
              type="text"
              id="fullName"
              autoFocus
              {...register("fullName")}
            />
          </div>

          <div className={s.inputs}>
            <label htmlFor="phone">Número de celular:</label>
            <input required type="tel" id="phone" {...register("phone")} />
          </div>

          <div className={s.inputs}>
            <label htmlFor="birthDate">Fecha de nacimiento:</label>
            <input
              required
              type="date"
              id="birthDate"
              {...register("birthDate")}
            />
          </div>

          <div className={s.inputs}>
            <label htmlFor="address">Domicilio Real:</label>
            <input required type="text" id="address" {...register("address")} />
          </div>

          <div className={s.inputs}>
            <label htmlFor="addressLocation">Localidad:</label>
            <input
              required
              type="text"
              id="addressLocation"
              {...register("addressLocation")}
            />
          </div>

          <div className={s.inputs}>
            <label htmlFor="addressProvince">Provincia:</label>
            <input
              required
              type="text"
              id="addressProvince"
              {...register("addressProvince")}
            />
          </div>

          <div className={s.inputs}>
            <label htmlFor="dniNumber">DNI:</label>
            <input
              required
              type="text"
              id="dniNumber"
              {...register("dniNumber")}
            />
          </div>

          <div className={s.dni_files_wrapper}>
            <div>
              <label htmlFor="dniFront">Foto de tu DNI (anverso):</label>
              <button
                type="button"
                id="dniFront"
                onClick={() => openWidget(setDniFront)}
              >
                subir archivo
              </button>
            </div>

            <div>
              <label htmlFor="dniBack">Foto de tu DNI (dorso):</label>
              <button
                type="button"
                id="dniBack"
                onClick={() => openWidget(setDniBack)}
              >
                subir archivo
              </button>
            </div>
          </div>

          <div className={s.inputs}>
            <label htmlFor="occupation">Ocupación:</label>
            <input
              required
              type="text"
              id="occupation"
              {...register("occupation")}
            />
          </div>

          <div className={s.flex}>
            <label htmlFor="student">Estudiante:</label>
            <input type="checkbox" id="student" {...register("student")} />
          </div>

          <div className={s.flex}>
            <label htmlFor="employee">Empleado R.D:</label>
            <input type="checkbox" id="employee" {...register("employee")} />
          </div>

          <div className={s.inputs}>
            <label htmlFor="company">Empresa:</label>
            <input type="text" id="company" {...register("company")} />
          </div>

          <div className={s.inputs}>
            <label htmlFor="cuit">CUIT:</label>
            <input required type="text" id="cuit" {...register("cuit")} />
          </div>

          <div className={s.inputs}>
            <label htmlFor="bussinessName">Razón Social:</label>
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
