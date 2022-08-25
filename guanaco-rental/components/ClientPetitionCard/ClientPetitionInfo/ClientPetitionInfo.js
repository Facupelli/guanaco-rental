import s from "./ClientPetitionInfo.module.scss";

export default function ClientPetitionInfo({
  user,
  setNewClientInfo,
  getNewClientUsers,
  getClientUsers,
}) {
  const onClickApprove = async (approved) => {
    const data = JSON.stringify({
      userId: user.id,
      customerAproved: approved,
    });

    const updatedUser = await fetch("http://localhost:3001/users", {
      method: "PUT",
      body: data,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      console.log("UpdatedUser", response.json());
      setNewClientInfo({});
      getNewClientUsers();
      getClientUsers();
    });
  };

  return (
    <div className={s.data_wrapper}>
      <ul>
        <li>Nombre Completo:</li>
        <li>DNI:</li>
        <li>DNI foto anverso:</li>
        <li>DNI foto dorso:</li>
        <li>Celular:</li>
        <li>Fecha Nacimiento:</li>
        <li>Domicilio:</li>
        <li>Localidad:</li>
        <li>Provincia:</li>
        <li>Ocupacion:</li>
        <li>Estudiante:</li>
        <li>Empleado:</li>
        <li>Empresa:</li>
        <li>CUIT:</li>
        <li>Razon Social:</li>
        <li>CONTACTOS</li>
        <li>contacto 1:</li>
        <li>contacto 2:</li>
        <li>contacto 3:</li>
        <li>CUENTA BANCARIA</li>
        <li>Banco:</li>
        <li>Alias:</li>
        <li>CBU:</li>
      </ul>
      <ul>
        <li>{user.fullName}</li>
        <li>{user.dniNumber}</li>
        <li>
          <a
            href={`${user.dni.dniFront}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            dni frente
          </a>
        </li>
        <li>
          <a
            href={`${user.dni.dniBack}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            dni reverso
          </a>
        </li>
        <li>{user.phone}</li>
        <li>{new Date(user.birthDate).toLocaleDateString()}</li>
        <li>{user.address}</li>
        <li>{user.addressLocation}</li>
        <li>{user.addressProvince}</li>
        <li>{user.occupation}</li>
        <li>{user.student ? "SI" : "NO"}</li>
        <li>{user.employee ? "SI" : "NO"}</li>
        <li>{user.company ? user.company : "-"}</li>
        <li>{user.cuit}</li>
        <li>{user.bussinessName ? user.bussinessName : "-"}</li>
        <li>--------------</li>
        <li>
          {user.contacts.contact1} {"("}
          {user.contacts.bond1}
          {")"}
        </li>
        <li>
          {user.contacts.contact2} {"("}
          {user.contacts.bond2}
          {")"}
        </li>
        <li>
          {user.contacts.contact3} {"("}
          {user.contacts.bond3}
          {")"}
        </li>
        <li>--------------</li>
        <li>{user.bank}</li>
        <li>{user.alias}</li>
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
  );
}
