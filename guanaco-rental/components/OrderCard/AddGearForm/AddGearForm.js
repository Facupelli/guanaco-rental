import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateGearFromOrder } from "../../../utils/orders";

import s from "./AddGearForm.module.scss";

export default function AddGearForm({
  equipments,
  setAddGearInputs,
  addGearInputs,
  order,
  loading,
  refetchOrders,
  token,
}) {
  return (
    <>
      <div className={s.add_gear_title}>
        <h3>Agregar equipo a pedido</h3>
        <p>(controlar stock manualmente!)</p>
      </div>
      <input
        type="search"
        className={s.search}
        onChange={(e) =>
          setAddGearInputs((prev) => ({ ...prev, search: e.target.value }))
        }
      />
      <div>
        {loading && <p>Cargando...</p>}
        {!loading &&
          equipments.length > 0 &&
          equipments.map((gear) => (
            <div key={gear.id} className={s.modal_gear_wrapper}>
              <p className={s.gear_name}>
                {gear.name} {gear.brand} {gear.model}
              </p>
              <input
                type="text"
                className={s.qty_input}
                onChange={(e) =>
                  setAddGearInputs((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }))
                }
              />
              <div className={s.add_gear_btn_wrapper}>
                <button
                  type="button"
                  aria-label="add_gear"
                  onClick={() => {
                    if (
                      addGearInputs.quantity &&
                      addGearInputs.quantity <= gear.stock
                    ) {
                      updateGearFromOrder(
                        order,
                        gear,
                        "add",
                        addGearInputs,
                        token
                      ).then(() => refetchOrders());
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faAdd} className={s.add_gear_icon} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
