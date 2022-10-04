import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useState } from "react";

import s from "./GearAdminCard.module.scss";
import MessageModal from "../MessageModal/MessageModal";

export default function GearAdminCard({ gear, getEquipment, token, role }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showBookings, setShowBookings] = useState(false);

  const handleDeleteGear = async () => {
    const response = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/equipment/${gear.id}`
        : `http://localhost:3001/equipment/${gear.id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `${token}`,
        },
      }
    );
    const equipment = await response.json();
    if (equipment.message === "success") {
      getEquipment();
    }
  };

  const onSubmit = async (data) => {
    const gearData = JSON.stringify({
      ...data,
      id: gear.id,
    });

    const updatedGear = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/equipment`
        : "http://localhost:3001/equipment",
      {
        method: "PUT",
        body: gearData,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          authorization: `${token}`,
        },
      }
    )
      .then((response) => {
        getEquipment();
      })
      .catch((e) => console.log("updateGear error:", e));
  };

  const getGearNextBooks = () => {
    return gear.bookings
      .filter(
        (book) =>
          new Date().getTime() <=
          new Date(book.book.dates[book.book.dates.length - 1])
      )
      .sort((a, b) => {
        if (new Date(a.book.dates[0]).getTime() < new Date(b.book.dates[0])) {
          return -1;
        }
        if (new Date(a.book.dates[0]).getTime() > new Date(b.book.dates[0])) {
          return 1;
        }
        return 0;
      });
  };

  return (
    <>
      {showBookings && (
        <MessageModal btnFunc={() => setShowBookings(false)}>
          <p className={s.font_w_6}><strong >Próximas Reservas:</strong></p>
          {getGearNextBooks().map((book) => (
            <div key={book.bookId} className={s.flex}>
              {book.book.dates
                .map((date) => new Date(date).toLocaleDateString())
                .join(" - ")}
              <p>
                <strong>x{book.quantity}</strong>
              </p>
            </div>
          ))}
        </MessageModal>
      )}
      <div className={s.admin_gear_container}>
        <div className={s.image_wrapper} onClick={() => setShowBookings(true)}>
          <Image
            src={`/equipmentPics/${gear.image}`}
            alt={gear.name}
            layout="fill"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.flex_grow_2}>
            <div className={`${s.flex_wrapper} ${s.bold}`}>
              <input
                type="text"
                defaultValue={gear.name}
                {...register("name")}
                disabled={role === "EMPLOYEE" ? true : false}
              />
              <input
                type="text"
                defaultValue={gear.brand}
                {...register("brand")}
                disabled={role === "EMPLOYEE" ? true : false}
              />
            </div>
            <input
              type="text"
              defaultValue={gear.model}
              {...register("model")}
              disabled={role === "EMPLOYEE" ? true : false}
            />
          </div>
          {role === "ADMIN" && (
            <div className={`${s.flex_wrapper} `}>
              <label>Disponible:</label>
              <input
                type="checkbox"
                defaultValue={gear.available}
                defaultChecked={gear.available}
                {...register("available")}
              />
            </div>
          )}
          {/* <div className={`${s.flex_wrapper} `}>
            <label>IMAGE:</label>
            <input
              defaultValue={gear.image}
              className={s.price_input}
              {...register("image")}
            />
          </div> */}
          <div className={`${s.flex_wrapper} `}>
            <label>Stock:</label>
            <input
              defaultValue={gear.stock}
              className={s.stock_input}
              {...register("stock")}
              disabled={role === "EMPLOYEE" ? true : false}
            />
          </div>
          <div className={`${s.flex_wrapper} `}>
            <label>Precio:</label>
            <input
              defaultValue={gear.price}
              className={s.price_input}
              {...register("price")}
              disabled={role === "EMPLOYEE" ? true : false}
            />
          </div>
          <div className={`${s.flex_wrapper} `}>
            <label>Sucursal:</label>
            <select
              defaultValue={gear.location}
              {...register("location")}
              disabled={role === "EMPLOYEE" ? true : false}
            >
              <option value="SAN_JUAN">San Juan</option>
              <option value="MENDOZA">Mendoza</option>
            </select>
          </div>
          {role === "EMPLOYEE" && (
            <button type="button" onClick={() => setShowBookings(true)}>
              VER RESERVAS
            </button>
          )}
          {role === "ADMIN" && (
            <>
              <div className={s.flex_wrapper}>
                <label>de:</label>
                <select defaultValue={gear.owner} {...register("owner")}>
                  <option value="FEDERICO">Federico</option>
                  <option value="OSCAR">Oscar</option>
                  <option value="BOTH">Ambos</option>
                  <option value="SUB">Subalquilado</option>
                </select>
              </div>
              <button>ACTUALIZAR</button>
              <button
                type="button"
                className={s.delete_btn}
                onClick={handleDeleteGear}
              >
                <FontAwesomeIcon icon={faTrash} aria-label="delete-btn" />
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}

// const handleCountry = (e) => {
//   const country = europeCountry.find((c) => c === e.target.value);
//   if (country) {
//     setValue(e.target.value);
//   } else {
//     setValue("");
//   }
// };
