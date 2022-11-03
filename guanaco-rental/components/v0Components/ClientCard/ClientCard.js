import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState } from "react";
// import { useDownloadBlob } from "../../hooks/useDownloadBlob";

import s from "./ClientCard.module.scss";

export default function ClientCard({ user, admin }) {
  const [expand, setExpand] = useState();
  const [dniUrl, setDniUrl] = useState();

  // const { blob, setBlob, downloadDni } = useDownloadBlob();

  return (
    <div className={`${expand ? s.grid : ""}`}>
      <div className={`${s.card_container} ${expand ? s.box_active : s.box}`}>
        {!expand && (
          <div className={s.user_summary} onClick={() => setExpand(true)}>
            <p className={s.bold}>
              <strong>{user.fullName}</strong>
            </p>
            <p>
              <span className={s.bold}>tel:</span> {user.phone}
            </p>
            <p>
              <span className={s.bold}>dni:</span> {user.dniNumber}
            </p>
            <p>{user.addressProvince}</p>
            <p>Pedidos: {user.orders.length}</p>
            {admin && (
              <p>
                <strong>{user.role}</strong>
              </p>
            )}
            <p className={s.alta}>
              ALTA: {new Date(user.customerApprovedAt).toLocaleDateString("es-AR")}
            </p>
          </div>
        )}
        {expand && (
          <ul>
            <div className={s.btn_wrapper}>
              <button
                type="button"
                onClick={() => {
                  setExpand(false);
                  setDniUrl("");
                }}
              >
                <FontAwesomeIcon icon={faXmark} height={20} />
              </button>
            </div>
            <div>
              <li>Nombre Completo:</li>
              <li>{user.fullName}</li>
            </div>
            <div>
              <li>Alta:</li>
              <li>{new Date(user.customerApprovedAt).toLocaleDateString()}</li>
            </div>
            <div>
              <li>DNI:</li>
              <li>{user.dniNumber}</li>
            </div>
            <div>
              <li>DNI foto anverso:</li>
              <li>
                {/* <a
                  href={`${user.dni.dniFront}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  dni frente
                </a> */}
                <button
                  type="button"
                  onClick={() => setDniUrl(user.dni.dniFront)}
                >
                  ver foto
                </button>
              </li>
            </div>
            <div>
              <li>DNI foto dorso:</li>
              <li>
                {/* <a
                  href={`${user.dni.dniBack}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  dni reverso
                </a> */}
                <button
                  type="button"
                  onClick={() => setDniUrl(user.dni.dniBack)}
                >
                  ver foto
                </button>
              </li>
            </div>
            <div>
              <li>Celular:</li>
              <li>{user.phone}</li>
            </div>
            <div>
              <li>Fecha Nacimiento:</li>
              <li>{new Date(user.birthDate).toLocaleDateString()}</li>
            </div>
            <div>
              <li>Domicilio:</li>
              <li>{user.address}</li>
            </div>
            <div>
              <li>Localidad:</li>
              <li>{user.addressLocation}</li>
            </div>
            <div>
              <li>Provincia:</li>
              <li>{user.addressProvince}</li>
            </div>
            <div>
              <li>Ocupacion:</li>
              <li>{user.occupation}</li>
            </div>
            <div>
              <li>Estudiante:</li>
              <li>{user.student ? "SI" : "NO"}</li>
            </div>
            <div>
              <li>Empleado:</li>
              <li>{user.employee ? "SI" : "NO"}</li>
            </div>
            <div>
              <li>Empresa:</li>
              <li>{user.company ? user.company : "-"}</li>
            </div>
            <div>
              <li>CUIT:</li>
              <li>{user.cuit}</li>
            </div>
            <div>
              <li>Razon Social:</li>
              <li>{user.bussinessName ? user.bussinessName : "-"}</li>
            </div>
            <div>
              <li>Banco:</li>
              <li>{user.bank}</li>
            </div>
            <div>
              <li>Alias:</li>
              <li>{user.alias}</li>
            </div>
            <div>
              <li>CBU:</li>
              <li>{user.cbu}</li>
            </div>
            <div>
              <li>Pedidos (n°):</li>
              <li>{user.orders.map((order) => order.number).join(", ")}</li>
            </div>
          </ul>
        )}
      </div>
      {dniUrl && (
        <div className={s.image_wrapper}>
          <Image
            src={dniUrl}
            alt={dniUrl}
            width={400}
            height={400}
            objectFit="contain"
            layout="responsive"
          />
        </div>
      )}
    </div>
  );
}
