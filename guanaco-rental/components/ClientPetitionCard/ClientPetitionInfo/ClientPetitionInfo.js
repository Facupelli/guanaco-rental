// import { supabase } from "../../../lib/supabase";
import Image from "next/image";
// import { useDownloadBlob } from "../../../hooks/useDownloadBlob";
import { useState } from "react";

import MessageModal from "../../MessageModal/MessageModal";

import s from "./ClientPetitionInfo.module.scss";

export default function ClientPetitionInfo({
  user,
  setNewClientInfo,
  refetchNewClients,
  refetchClients,
}) {
  // const { blob, setBlob, downloadDni } = useDownloadBlob();

  const [dniUrl, setDniUrl] = useState("");

  const onClickApprove = async (approved) => {
    const data = JSON.stringify({
      userId: user.id,
      customerApproved: approved,
      petitionSent: approved ? "APPROVED" : "DENIED",
    });

    const updatedUser = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/users`
        : "http://localhost:3001/users",
      {
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        setNewClientInfo({});
        //traer usuarios
        refetchNewClients();
        refetchClients();
      })
      .catch((e) => console.log("update user error:", e));
  };

  return (
    <>
      {dniUrl && (
        <MessageModal showButton btnFunc={() => setDniUrl("")}>
          <Image
            src={dniUrl}
            alt={dniUrl}
            width={500}
            height={500}
            objectFit="contain"
            layout="responsive"
          />
        </MessageModal>
      )}
      <div className={s.data_wrapper}>
        <ul>
          <li>
            <strong>Nombre Completo:</strong>
          </li>
          <li>{user.fullName}</li>
          <li>
            <strong>DNI:</strong>
          </li>
          <li>{user.dniNumber}</li>
          <li>
            <strong>DNI foto anverso:</strong>
          </li>
          <li>
            {/* <a
            href={`${user.dni.dniFront}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            dni frente
          </a> */}
            <button type="button" onClick={() => setDniUrl(user.dni.dniFront)}>
              ver foto
            </button>
          </li>
          <li>
            <strong>DNI foto dorso:</strong>
          </li>
          <li>
            {/* <a
            href={`${user.dni.dniBack}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            dni reverso
          </a> */}
            <button type="button" onClick={() => setDniUrl(user.dni.dniBack)}>
              ver foto
            </button>
          </li>
          <li>
            <strong>Celular:</strong>
          </li>
          <li>{user.phone}</li>
          <li>
            <strong>Fecha Nacimiento:</strong>
          </li>
          <li>{new Date(user.birthDate).toLocaleDateString()}</li>
          <li>
            <strong>Domicilio:</strong>
          </li>
          <li>{user.address}</li>
          <li>
            <strong>Localidad:</strong>
          </li>
          <li>{user.addressLocation}</li>
          <li>
            <strong>Provincia:</strong>
          </li>
          <li>{user.addressProvince}</li>
          <li>
            <strong>Ocupacion:</strong>
          </li>
          <li>{user.occupation}</li>
          <li>
            <strong>Estudiante:</strong>
          </li>
          <li>{user.student ? "SI" : "NO"}</li>
          <li>
            <strong>Empleado:</strong>
          </li>
          <li>{user.employee ? "SI" : "NO"}</li>
          <li>
            <strong>Empresa:</strong>
          </li>
          <li>{user.company ? user.company : "-"}</li>
          <li>
            <strong>CUIT:</strong>
          </li>
          <li>{user.cuit}</li>
          <li>
            <strong>Razon Social:</strong>
          </li>
          <li>{user.bussinessName ? user.bussinessName : "-"}</li>
          <li>CONTACTOS</li>
          <li>--------------</li>
          <li>
            <strong>contacto 1</strong>:
          </li>
          <li>
            {user.contacts.contact1} {"("}
            {user.contacts.bond1}
            {")"}
          </li>
          <li>
            <strong>contacto 2</strong>:
          </li>
          <li>
            {user.contacts.contact2} {"("}
            {user.contacts.bond2}
            {")"}
          </li>
          <li>
            <strong>contacto 3</strong>:
          </li>
          <li>
            {user.contacts.contact3} {"("}
            {user.contacts.bond3}
            {")"}
          </li>
          <li>CUENTA BANCARIA</li>
          <li>--------------</li>
          <li>
            <strong>Banco:</strong>
          </li>
          <li>{user.bank}</li>
          <li>
            <strong>Alias:</strong>
          </li>
          <li>{user.alias}</li>
          <li>
            <strong>CBU:</strong>
          </li>
          <li>{user.cbu}</li>
        </ul>
        <div className={s.btns_wrapper}>
          <button
            type="button"
            onClick={() => onClickApprove(true)}
            className={s.m_button}
          >
            APROBAR
          </button>
          <button
            type="button"
            onClick={() => onClickApprove(false)}
            className={s.m_button_danger}
          >
            DENEGAR
          </button>
        </div>
      </div>
    </>
  );
}
