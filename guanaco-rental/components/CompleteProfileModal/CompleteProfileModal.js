import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import MessageModal from "../MessageModal/MessageModal";
import LoadingModal from "../LoadingModal/LoadingModal";

import s from "./CompleteProfileModal.module.scss";

export default function CompleteProfileModal({user}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // const [dniFront, setDniFront] = useState();
  // const [dniBack, setDniBack] = useState("");

  // const openWidget = (setImagePublicId) => {
  //   // create the widget
  //   if (typeof window !== "undefined") {
  //     const widget = window.cloudinary.createUploadWidget(
  //       {
  //         cloudName: "dzjz8pe0y",
  //         uploadPreset: "zrp6p2qt",
  //         sources: ["local", "url", "camera", "dropbox", "goole_drive"],
  //       },
  //       (error, result) => {
  //         if (
  //           result.event === "success" &&
  //           result.info.resource_type === "image"
  //         ) {
  //           console.log("RESULT", result.info);
  //           setImagePublicId(result.info.secure_url);
  //         }
  //       }
  //     );
  //     widget.open(); // open up the widget after creation
  //   }
  // };

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Assd");

    const dniFront = data.dniFront[0];
    const dniBack = data.dniBack[0];

    const userData = JSON.stringify({
      ...data,
      email: user.email,
      customerApproved: false,
      petitionSent: "PENDING",
      dniFront: dniFront?.name,
      dniBack: dniBack?.name,
    });

    try {
      await supabase.storage
        .from("users-dni")
        .upload(`${dniFront.name}`, dniFront);

      await supabase.storage
        .from("users-dni")
        .upload(`${dniBack.name}`, dniBack);
    } catch (e) {
      console.log(e);
    }

    const newCustomerPetition = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://guanaco-rental-production.up.railway.app/users`
        : "http://localhost:3001/users",
      {
        method: "POST",
        body: userData,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((e) => console.log("error", e))
      .finally(() => setLoading(false));

    if (newCustomerPetition && newCustomerPetition.message === "success") {
      console.log("success");
      setMessage(
        "Alta enviada correctamente. Hasta 48hs para aprobarla/denegarla."
      );
    }
  };

  return (
    <>
      {loading && (
        <LoadingModal>
          <p>Procesando...</p>
        </LoadingModal>
      )}
      {message && (
        <MessageModal
          showButton
          btnFunc={() => {
            setMessage("");
            router.push("/");
          }}
        >
          <p>{message}</p>
        </MessageModal>
      )}
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
                {...register("fullName")}
              />
              {errors.fullName?.message}
            </div>

            <div className={s.inputs}>
              <label htmlFor="phone">Número de celular:</label>
              <input required type="tel" id="phone" {...register("phone")} />
              {errors.phone?.message}
            </div>

            <div className={s.inputs}>
              <label htmlFor="birthDate">Fecha de nacimiento:</label>
              <input
                required
                type="date"
                id="birthDate"
                {...register("birthDate")}
              />
              {errors.birthDate?.message}
            </div>

            <div className={s.inputs}>
              <label htmlFor="address">Domicilio Real:</label>
              <input
                required
                type="text"
                id="address"
                {...register("address")}
              />
              {errors.address?.message}
            </div>

            <div className={s.inputs}>
              <label htmlFor="addressLocation">Localidad:</label>
              <input
                required
                type="text"
                id="addressLocation"
                {...register("addressLocation")}
              />
              {errors.addressLocation?.message}
            </div>

            <div className={s.inputs}>
              <label htmlFor="addressProvince">Provincia:</label>
              <input
                required
                type="text"
                id="addressProvince"
                {...register("addressProvince")}
              />
              {errors.addressProvince?.message}
            </div>

            <div className={s.inputs}>
              <label htmlFor="dniNumber">DNI:</label>
              <input
                required
                type="text"
                id="dniNumber"
                {...register("dniNumber")}
              />
              {errors.dniNumber?.message}
            </div>

            <div className={s.dni_files_wrapper}>
              <div>
                <label htmlFor="dniFront">Foto de tu DNI (anverso):</label>
                {/* <button
                  type="button"
                  id="dniFront"
                  onClick={() => openWidget(setDniFront)}
                >
                  subir archivo
                </button> */}
                <input type="file" {...register("dniFront")} id="dniFront" />
              </div>

              <div>
                <label htmlFor="dniBack">Foto de tu DNI (dorso):</label>
                {/* <button
                  type="button"
                  id="dniBack"
                  onClick={() => openWidget(setDniBack)}
                >
                  subir archivo
                </button> */}
                <input type="file" {...register("dniBack")} id="dniBack" />
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
              {errors.occupation?.message}
            </div>

            <div className={s.flex}>
              <label htmlFor="student">Estudiante:</label>
              <input type="checkbox" id="student" {...register("student")} />
              {errors.student?.message}
            </div>

            <div className={s.flex}>
              <label htmlFor="employee">Empleado R.D:</label>
              <input type="checkbox" id="employee" {...register("employee")} />
              {errors.employee?.message}
            </div>

            <div className={s.inputs}>
              <label htmlFor="company">Empresa:</label>
              <input type="text" id="company" {...register("company")} />
              {errors.company?.message}
            </div>

            <div className={s.inputs}>
              <label htmlFor="cuit">CUIT:</label>
              <input required type="text" id="cuit" {...register("cuit")} />
              {errors.cuit?.message}
            </div>

            <div className={s.inputs}>
              <label htmlFor="bussinessName">Razón Social:</label>
              <input
                type="text"
                id="bussinessName"
                {...register("businessName")}
              />
              {errors.bussinessName?.message}
            </div>
          </fieldset>

          <fieldset className={s.contacts_wrapper}>
            <legend>CONTACTOS RELACIONADOS</legend>
            <div>
              <label htmlFor="contact1">Contacto 1:</label>
              <input
                type="text"
                id="contact1"
                {...register("contacts.contact1")}
              />
              {errors.contact1?.message}
              <label htmlFor="bond1">Vínculo:</label>
              <input type="text" id="bond1" {...register("contacts.bond1")} />
              {errors.bond1?.message}
            </div>
            <div>
              <label htmlFor="contact2">Contacto 2:</label>
              <input
                type="text"
                id="contact2"
                {...register("contacts.contact2")}
              />
              {errors.contact2?.message}
              <label htmlFor="bond2">Vínculo:</label>
              <input type="text" id="bond2" {...register("contacts.bond2")} />
              {errors.bond2?.message}
            </div>
            <div>
              <label htmlFor="contact3">Contacto 3:</label>
              <input
                type="text"
                id="contact3"
                {...register("contacts.contact3")}
              />
              {errors.contact3?.message}
              <label htmlFor="bond3">Vínculo:</label>
              <input type="text" id="bond3" {...register("contacts.bond3")} />
              {errors.bond3?.message}
            </div>
          </fieldset>

          <fieldset className={s.bank_info_wrapper}>
            <legend>DATOS DE CUENTA BANCARIA:</legend>
            <div>
              <label htmlFor="bank">Banco:</label>
              <input type="text" id="bank" {...register("bank")} />
              {errors.bank?.message}
              <label htmlFor="alias">Alias:</label>
              <input type="text" id="alias" {...register("alias")} />
              {errors.alias?.message}
              <label htmlFor="cbu">CBU:</label>
              <input type="text" id="cbu" {...register("cbu")} />
              {errors.cbu?.message}
            </div>
          </fieldset>

          <div className={s.btn_wrapper}>
            <button type="submit">siguiente</button>
          </div>
        </form>
      </div>
    </>
  );
}
