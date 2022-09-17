import s from "./ButtonLoader.module.scss";

export default function ButtonLoader() {
  return (
    <div className={s.container}>
      <div className={s.loader}></div>
    </div>
  );
}
