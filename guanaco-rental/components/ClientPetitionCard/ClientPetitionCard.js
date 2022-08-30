import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import s from "./ClientPetitionCard.module.scss";

export default function ClientPetitionCard({
  user,
  setNewClientInfo,
  newClientInfo,
}) {
  const handleClick = () => {
    setNewClientInfo(user);
  };

  return (
    <div
      className={`${s.card_container} ${
        newClientInfo.email === user.email ? s.none_shadow : ""
      }`}
    >
      <div className={s.name_wrapper}>
        <p>{user.fullName}</p>
        <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
        <p>{user.customerApproved ? "APROBADA" : "PENDIENTE"}</p>
        <button type="button" onClick={handleClick}>
          <FontAwesomeIcon icon={faArrowRight} height={15} />
        </button>
      </div>
    </div>
  );
}

{
  /* <div key={user.id}>
              <p>{user.email}</p>
              {user.phone && !user.customerApproved && (
                <div>
                  <p>NUEVA PETICIÓN</p>
                  <p>Datos:</p>
                  
                  
                </div>
              )}
            </div> */
}
