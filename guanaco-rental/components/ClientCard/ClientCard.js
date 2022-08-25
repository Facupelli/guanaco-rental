import { useState } from "react";

import s from "./ClientCard.module.scss";

export default function ClientCard({ user }) {
  const [expand, setExpand] = useState();

  console.log(user)

  return (
    <div className={`${s.card_container} ${expand ? s.box_active : s.box}`}>
      {!expand && (
        <div className={s.user_summary} onClick={() => setExpand(true)}>
          <p>{user.fullName}</p>
          <p>tel: {user.phone}</p>
          <p>dni: {user.dniNumber}</p>
          <p>{user.addressProvince}</p>
          <p>Pedidos: {user.orders.length}</p>
          <p className={s.alta}>
            ALTA: {new Date(user.customerAprovedAt).toLocaleDateString()}
          </p>
        </div>
      )}
      {expand && (
        <ul>
          <div className={s.btn_wrapper}>
            <button type="button" onClick={() => setExpand(false)}>
              X
            </button>
          </div>
          <div>
            <li>Nombre Completo:</li>
            <li>{user.fullName}</li>
          </div>
          <div>
            <li>Alta:</li>
            <li>{new Date(user.customerAprovedAt).toLocaleDateString()}</li>
          </div>
          <div>
            <li>DNI:</li>
            <li>{user.dniNumber}</li>
          </div>
          <div>
            <li>DNI foto anverso:</li>
            <li>
              <a
                href={`${user.dni.dniFront}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                dni frente
              </a>
            </li>
          </div>
          <div>
            <li>DNI foto dorso:</li>
            <li>
              <a
                href={`${user.dni.dniBack}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                dni reverso
              </a>
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
            <li>{user.orders.map(order => order.number).join(", ")}</li>
          </div>
        </ul>
      )}
    </div>
  );
}
