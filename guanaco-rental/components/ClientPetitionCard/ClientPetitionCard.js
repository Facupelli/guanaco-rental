import { useState } from "react";

import s from "./ClientPetitionCard.module.scss";

export default function ClientPetitionCard({ user }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={s.container}>
      <div className={s.card_container}>
        <div className={s.name_wrapper}>
          <p>{user.fullName}</p>
          <p>{user.email}</p>
          <p>STATUS: {user.customerAproved ? "APROBADA" : "PENDIENTE"}</p>
          <button type="button" onClick={() => setShowInfo(!showInfo)}>
            {"->"}
          </button>
        </div>
      </div>
      {showInfo && (
        <div className={s.data_wrapper}>
          <div>
            <p>Nombre Completo:</p>
            <p>Celular:</p>
            <p>Fecha Nacimiento:</p>
            <p>Domicilio:</p>
            <p>Localidad:</p>
            <p>Provincia:</p>
            <p>Ocupacion:</p>
            <p>Estudiante:</p>
            <p>Empleado:</p>
            <p>Empresa:</p>
            <p>CUIT:</p>
            <p>Razon Social:</p>
            <p>CUENTA BANCARIA:</p>
            <p>Banco:</p>
            <p>Alias:</p>
            <p>CBU:</p>
          </div>
          <div>
            <p>{user.fullName}</p>
            <p>{user.phone}</p>
            <p>{new Date(user.birthDate).toLocaleDateString()}</p>
            <p>{user.address}</p>
            <p>{user.addressLocation}</p>
            <p>{user.addressProvince}</p>
            <p>{user.occupation}</p>
            <p>{user.student ? "SI" : "NO"}</p>
            <p>{user.employee ? "SI" : "NO"}</p>
            <p>{user.company ? user.company : "-"}</p>
            <p>{user.cuit}</p>
            <p>{user.bussinessName ? user.bussinessName : "-"}</p>
            <p>CUENTA BANCARIA</p>
            <p>{user.bank}</p>
            <p>{user.alias}</p>
            <p>{user.cbu}</p>
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* <div key={user.id}>
              <p>{user.email}</p>
              {user.phone && !user.customerAproved && (
                <div>
                  <p>NUEVA PETICIÓN</p>
                  <p>Datos:</p>
                  
                  <button type="button">APROBAR</button>
                  <button type="button">NO APROBAR</button>
                </div>
              )}
            </div> */
}
