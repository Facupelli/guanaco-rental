import CartPageItem from "./CartPageItem/CartPageItem";
import s from "./CartPageList.module.scss";

export default function CartPageList({ cart, date }) {
  return (
    <div className={s.list_container}>
      <div className={s.table_titles}>
        <p>Equipos</p>
        <p>Cantidad</p>
        <p>Precio</p>
      </div>
      {cart && cart.length > 0 ? (
        cart.map((item) => (
          <CartPageItem key={item.id} item={item} dates={date} />
        ))
      ) : (
        <p>No tiene equipos agregados al carrito!</p>
      )}
    </div>
  );
}
