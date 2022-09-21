import Image from "next/image";
import { useForm } from "react-hook-form";
import s from "./GearAdminCard.module.scss";

export default function GearAdminCard({ gear, getEquipment, token }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data, gear.id);
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
        console.log("UpdatedGear", response.json());
        getEquipment();
      })
      .catch((e) => console.log("updateGear error:", e));
  };

  return (
    <div className={s.admin_gear_container}>
      <div className={s.image_wrapper}>
        <Image
          src={`/equipmentPics/${gear.image}`}
          alt={gear.name}
          layout="fill"
        />
      </div>
      <div className={s.flex_grow_2}>
        <div className={`${s.flex_wrapper} ${s.bold}`}>
          <input type="text" defaultValue={gear.name} {...register("name")} />
          <input type="text" defaultValue={gear.brand} {...register("brand")} />
        </div>
        <input type="text" defaultValue={gear.model} {...register("model")} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${s.flex_wrapper} `}>
          <label>Disponible:</label>
          <input
            type="checkbox"
            defaultValue={gear.available}
            defaultChecked={gear.available}
            {...register("available")}
          />
        </div>
        <div className={`${s.flex_wrapper} `}>
          <label>Stock:</label>
          <input
            defaultValue={gear.stock}
            className={s.stock_input}
            {...register("stock")}
          />
        </div>
        <div className={`${s.flex_wrapper} `}>
          <label>Precio:</label>
          <input
            defaultValue={gear.price}
            className={s.price_input}
            {...register("price")}
          />
        </div>
        {/* <div className={`${s.flex_wrapper} `}>
          <label>Sucursal:</label>
          <select defaultValue={gear.location} {...register("location")}>
            <option value="San Juan">San Juan</option>
            <option value="Mendoza">Mendoza</option>
          </select>
        </div> */}
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
      </form>
    </div>
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
