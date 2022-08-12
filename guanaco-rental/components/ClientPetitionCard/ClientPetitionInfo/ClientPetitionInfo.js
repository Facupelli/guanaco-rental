import s from "./ClientPetitionInfo.module.scss";

export default function ClientPetitionInfo({ user }) {
  return (
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
        <p>CUENTA BANCARIA</p>
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
        <p>--------------</p>
        <p>{user.bank}</p>
        <p>{user.alias}</p>
        <p>{user.cbu}</p>
      </div>
      <div className={s.btns_wrapper}>
        <button type="button">APROBAR</button>
        <button type="button">NO APROBAR</button>
      </div>
    </div>
  );
}
