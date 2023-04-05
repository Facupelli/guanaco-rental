import { useState } from "react";
import { useRouter } from "next/router";
// import { supabase } from "../../lib/supabase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import { useSession } from "next-auth/react";

import MessageModal from "../MessageModal/MessageModal";
import LoadingModal from "../LoadingModal/LoadingModal";

import s from "./CompleteProfileModal.module.scss";

export default function CompleteProfileModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: session } = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [dniFront, setDniFront] = useState();

  const [dniBack, setDniBack] = useState("");

  const openWidget = (setImagePublicId) => {
    // create the widget
    if (typeof window !== "undefined") {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CL_CLOUD_NAME,
          uploadPreset: process.env.NEXT_PUBLIC_CL_UPLOAD_PRESET,
          sources: ["local", "url", "camera", "dropbox", "goole_drive"],
          maxFileSize: 5000000,
        },
        (error, result) => {
          if (
            result.event === "success" &&
            result.info.resource_type === "image"
          ) {
            setImagePublicId(result.info.secure_url);
          }
        }
      );
      widget.open(); // open up the widget after creation
    }
  };

  const onSubmit = async (data) => {
    console.log("SESSION", session);
    if (!session) {
      setMessage("Debes iniciar sesión para enviar el alta!");
      return;
    }

    setLoading(true);

    // const dniFront = data.dniFront[0];
    // const dniBack = data.dniBack[0];

    const userData = JSON.stringify({
      ...data,
      email: session?.user.email,
      customerApproved: false,
      petitionSent: "PENDING",
      dniFront: dniFront,
      dniBack: dniBack,
    });

    const newCustomerPetition = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/users`
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
            if (message !== "Debes iniciar sesión para enviar el alta!") {
              router.push("/book");
            }
          }}
        >
          <p>{message}</p>
        </MessageModal>
      )}
      <div className={s.container}>
        <h1>FORMULARIO ALTA DE CLIENTE </h1>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <fieldset className={s.personal_info_wrapper}>
              <legend>INFORMACIÓN CLIENTE</legend>

              <div className={s.form_group}>
                <label htmlFor="fullName">Nombre Completo:</label>
                <input
                  required
                  type="text"
                  id="fullName"
                  defaultValue={session?.user.name}
                  {...register("fullName")}
                />
                <p className={s.form_error}>{errors.fullName?.message}</p>
              </div>

              <div className={s.form_group}>
                <label htmlFor="phone">Número de celular: (+54)</label>
                <input
                  required
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  placeholder="(código de área + número)"
                />
                <p className={s.form_error}>{errors.phone?.message}</p>
              </div>

              <div className={s.form_group}>
                <label htmlFor="birthDate">Fecha de nacimiento:</label>
                <input
                  required
                  type="date"
                  id="birthDate"
                  {...register("birthDate")}
                />
                <p className={s.form_error}>{errors.birthDate?.message}</p>
              </div>

              <div className={s.form_group}>
                <label htmlFor="address">Domicilio Real:</label>
                <input
                  required
                  type="text"
                  id="address"
                  {...register("address")}
                />
                <p className={s.form_error}>{errors.address?.message}</p>
              </div>

              <div className={s.form_group}>
                <label htmlFor="addressLocation">Localidad:</label>
                <input
                  required
                  type="text"
                  id="addressLocation"
                  {...register("addressLocation")}
                />
                <p className={s.form_error}>
                  {errors.addressLocation?.message}
                </p>
              </div>

              <div className={s.form_group}>
                <label htmlFor="addressProvince">Provincia:</label>
                <input
                  required
                  type="text"
                  id="addressProvince"
                  {...register("addressProvince")}
                />
                <p className={s.form_error}>
                  {errors.addressProvince?.message}
                </p>
              </div>

              <div className={s.form_group}>
                <label htmlFor="dniNumber">DNI:</label>
                <input
                  required
                  type="text"
                  id="dniNumber"
                  {...register("dniNumber")}
                />
                <p className={s.form_error}>{errors.dniNumber?.message}</p>
              </div>

              <div className={s.dni_files_wrapper}>
                <div>
                  <label htmlFor="dniFront">
                    Foto de tu DNI anverso (5mb max):
                  </label>
                  <button
                    type="button"
                    id="dniFront"
                    onClick={() => openWidget(setDniFront)}
                  >
                    {dniFront ? "arhivo cargado" : "subir archivo"}
                  </button>
                </div>

                <div>
                  <label htmlFor="dniBack">
                    Foto de tu DNI dorso (5mb max):
                  </label>
                  <button
                    type="button"
                    id="dniBack"
                    onClick={() => openWidget(setDniBack)}
                  >
                    {dniBack ? "archivo cargado" : "subir archivo"}
                  </button>
                </div>
              </div>

              <div className={s.form_group}>
                <label htmlFor="occupation">Ocupación:</label>
                <input
                  required
                  type="text"
                  id="occupation"
                  {...register("occupation")}
                />
                <p className={s.form_error}>{errors.occupation?.message}</p>
              </div>

              <div className={s.flex}>
                <label htmlFor="student">Estudiante:</label>
                <input type="checkbox" id="student" {...register("student")} />
                <p className={s.form_error}>{errors.student?.message}</p>
              </div>

              <div className={s.flex}>
                <label htmlFor="employee">Empleado R.D:</label>
                <input
                  type="checkbox"
                  id="employee"
                  {...register("employee")}
                />
                <p className={s.form_error}>{errors.employee?.message}</p>
              </div>

              <div className={s.form_group}>
                <label htmlFor="company">Empresa:</label>
                <input type="text" id="company" {...register("company")} />
                <p className={s.form_error}>{errors.company?.message}</p>
              </div>

              <div className={s.form_group}>
                <label htmlFor="cuit">CUIT:</label>
                <input type="text" id="cuit" {...register("cuit")} />
                <p className={s.form_error}>{errors.cuit?.message}</p>
              </div>

              <div className={s.form_group}>
                <label htmlFor="bussinessName">Razón Social:</label>
                <input
                  type="text"
                  id="bussinessName"
                  {...register("businessName")}
                />
                <p className={s.form_error}>{errors.bussinessName?.message}</p>
              </div>
            </fieldset>

            <fieldset className={s.contacts_wrapper}>
              <legend>CONTACTOS RELACIONADOS</legend>
              <div>
                <label htmlFor="contact1">Contacto 1:</label>
                <div className={s.full_w}>
                  <input
                    type="text"
                    id="contact1"
                    {...register("contacts.contact1")}
                  />
                  <p className={s.form_error}>
                    {errors.contacts?.contact1?.message}
                  </p>
                </div>

                <label htmlFor="bond1">Vínculo 1:</label>
                <div className={s.full_w}>
                  <input
                    type="text"
                    id="bond1"
                    {...register("contacts.bond1")}
                  />
                  <p className={s.form_error}>
                    {errors.contacts?.bond1?.message}
                  </p>
                </div>
              </div>
              <div>
                <label htmlFor="contact2">Contacto 2:</label>
                <div className={s.full_w}>
                  <input
                    type="text"
                    id="contact2"
                    {...register("contacts.contact2")}
                  />
                  <p className={s.form_error}>
                    {errors.contacts?.contact2?.message}
                  </p>
                </div>

                <label htmlFor="bond2">Vínculo 2:</label>
                <div className={s.full_w}>
                  <input
                    type="text"
                    id="bond2"
                    {...register("contacts.bond2")}
                  />
                  <p className={s.form_error}>
                    {errors.contacts?.bond2?.message}
                  </p>
                </div>
              </div>
              <div>
                <label htmlFor="contact3">Contacto 3:</label>
                <div className={s.full_w}>
                  <input
                    type="text"
                    id="contact3"
                    {...register("contacts.contact3")}
                  />
                  <p className={s.form_error}>
                    {errors.contacts?.contact3?.message}
                  </p>
                </div>

                <label htmlFor="bond3">Vínculo 3:</label>
                <div className={s.full_w}>
                  <input
                    type="text"
                    id="bond3"
                    {...register("contacts.bond3")}
                  />
                  <p className={s.form_error}>
                    {errors.contacts?.bond3?.message}
                  </p>
                </div>
              </div>
            </fieldset>

            <fieldset className={s.bank_info_wrapper}>
              <legend>DATOS DE CUENTA BANCARIA / MERCADOPAGO</legend>
              <div>
                <label htmlFor="bank">Banco:</label>
                <div>
                  <input type="text" id="bank" {...register("bank")} />
                  <p className={s.form_error}>{errors.bank?.message}</p>
                </div>
                <label htmlFor="alias">Alias:</label>
                <div>
                  <input type="text" id="alias" {...register("alias")} />
                  <p className={s.form_error}>{errors.alias?.message}</p>
                </div>
                <label htmlFor="cbu">CBU/CVU:</label>
                <div>
                  <input type="text" id="cbu" {...register("cbu")} />
                  <p className={s.form_error}>{errors.cbu?.message}</p>
                </div>
              </div>
            </fieldset>
          </div>
          <div className={s.btn_wrapper}>
            <button type="submit">siguiente</button>
          </div>
        </form>
      </div>
    </>
  );
}
