import { usePDF } from "@react-pdf/renderer";
import { RemitoPDF } from "../RemitoPDF";

import s from "./PDF.module.scss";

export default function PDF({ pickupDay, returnDay, order }) {
  const [instance, updateInstance] = usePDF({
    document: (
      <RemitoPDF pickupDay={pickupDay} returnDay={returnDay} order={order} />
    ),
  });

  if (instance.loading) return <p className={s.bold}>Cargando...</p>;

  if (instance.error) return <div>Something went wrong: {error}</div>;

  return (
    <a
      href={instance.url}
      target="_blank"
      rel="noreferrer"
      // download={`Remito ${order.user.fullName} - ${order.number}`}
    >
      Descargar remito
    </a>
  );
}
