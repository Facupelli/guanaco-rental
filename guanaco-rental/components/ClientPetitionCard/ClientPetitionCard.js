import { useState } from "react";

import s from "./ClientPetitionCard.module.scss";

export default function ClientPetitionCard({ user, setNewClientInfo }) {
  const handleClick = () => {
    setNewClientInfo(user);
  };

  return (
    <div className={s.container}>
      <div className={s.card_container}>
        <div className={s.name_wrapper}>
          <p>{user.fullName}</p>
          <p>{user.email}</p>
          <p>{user.customerAproved ? "APROBADA" : "PENDIENTE"}</p>
          <button type="button" onClick={handleClick}>
            {"->"}
          </button>
        </div>
      </div>
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
                  
                  
                </div>
              )}
            </div> */
}
