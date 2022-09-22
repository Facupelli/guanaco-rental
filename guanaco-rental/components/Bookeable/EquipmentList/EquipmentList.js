import { useSelector } from "react-redux";
import Loader from "../../Loaders/Loader/Loader";
import EquipmentCard from "./EquipmentCard/EquipmentCard";

import s from "./EquipmentList.module.scss";

export default function EquipmentList({
  setShowCart,
  qtyToShow,
  setQtyToShow,
}) {
  const equipment = useSelector((state) => state.equipment.products);
  const isLoading = useSelector((state) => state.equipment.loading);

  const isBtnDisabled = () => {
    return qtyToShow >= equipment.length;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={s.container}>
      {equipment.length > 0 ? (
        <>
          <div className={s.cards_wrapper}>
            {equipment.slice(0, qtyToShow).map((gear) => (
              <EquipmentCard
                key={gear.id}
                gear={gear}
                setShowCart={setShowCart}
              />
            ))}
          </div>
          {!isBtnDisabled() && (
            <div className={s.btn_wrapper}>
              <button
                type="button"
                onClick={() => setQtyToShow((prev) => prev + 10)}
              >
                mostrar más
              </button>
            </div>
          )}
        </>
      ) : (
        <p>No se encontraron equipos.</p>
      )}
    </div>
  );
}
