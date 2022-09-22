import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Nav from "../../../components/Nav/Nav";
import AdminMain from "../../../components/AdminMain/AdminMain";
import Loader from "../../../components/Loaders/Loader/Loader";

import s from "../../../styles/AddEquipmentPage.module.scss";

export default function AddEquipment({ equipment }) {
  const { register, handleSubmit, reset } = useForm();
  const { data: session } = useSession();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEquipmentCategories = () => {
    return fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/categories`
        : "http://localhost:3001/categories"
    ).then((res) => res.json());
  };

  useEffect(() => {
    fetchEquipmentCategories()
      .catch((e) => console.log(e))
      .then((res) => setCategories(res));
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    const gearData = JSON.stringify(data);

    const newEquipment = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/equipment`
        : "http://localhost:3001/equipment",
      {
        method: "POST",
        body: gearData,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          authorization: `${session.user.token}`,
        },
      }
    )
      .then((response) => response.json())
      .catch((e) => console.log("error", e))
      .finally(() => setLoading(false));

    if (newEquipment?.message === "success") {
      reset();
    }
  };

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Agregar Equipo</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>

      <Nav />

      <AdminMain title="Agregar Equipo">
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputs}>
            <label htmlFor="name">Nombre:</label>
            <input required type="text" id="name" {...register("name")} />
          </div>

          <div className={s.inputs}>
            <label htmlFor="brand">Marca:</label>
            <input required type="text" id="brand" {...register("brand")} />
          </div>

          <div className={s.inputs}>
            <label htmlFor="model">Modelo:</label>
            <input required type="text" id="model" {...register("model")} />
          </div>

          <div className={s.inputs}>
            <label htmlFor="image">Imagen (URL):</label>
            <input type="text" id="image" {...register("image")} />
          </div>

          <div className={s.inputs}>
            <label htmlFor="stock">Stock:</label>
            <input required type="text" id="stock" {...register("stock")} />
          </div>

          <div className={s.inputs}>
            <label htmlFor="price">Precio:</label>
            <input required type="text" id="price" {...register("price")} />
          </div>

          <div className={s.inputs}>
            <label htmlFor="accessories">Accesorios:</label>
            <input
              type="text"
              id="accessories"
              {...register("accessories.0")}
            />
          </div>

          <div className={s.inputs}>
            <label htmlFor="category">Categoría:</label>
            <select id="category" {...register("category")}>
              <option disabled>seleccionar</option>
              {categories?.length > 0 &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className={s.inputs}>
            <label htmlFor="owner">Dueño:</label>
            <select id="owner" {...register("owner")}>
              <option value="FEDERICO">FEDERICO</option>
              <option value="OSCAR">OSCAR</option>
              <option value="BOTH">AMBOS</option>
              <option value="SUB">SUB</option>
            </select>
          </div>

          <div className={s.inputs}>
            <label htmlFor="location">Sucursal:</label>
            <select id="location" {...register("location")}>
              <option value="SAN_JUAN">SAN JUAN</option>
              <option value="MENDOZA">MENDOZA</option>
            </select>
          </div>

          <button type="submit">
            {loading ? <Loader small /> : "AGREGAR"}
          </button>
        </form>
      </AdminMain>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session || session?.user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
