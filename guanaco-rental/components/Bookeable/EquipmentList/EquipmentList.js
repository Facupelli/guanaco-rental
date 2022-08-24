import { useState } from "react";
import { useSelector } from "react-redux";
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

  return (
    <div className={s.container}>
      {isLoading ? (
        <p>Cargando...</p>
      ) : equipment.length > 0 ? (
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
          <div className={s.btn_wrapper}>
            <button
              type="button"
              onClick={() => setQtyToShow((prev) => prev + 10)}
              disabled={isBtnDisabled()}
            >
              mostrar más
            </button>
          </div>
        </>
      ) : (
        <p>No se encontraron equipos.</p>
      )}
    </div>
  );
}
