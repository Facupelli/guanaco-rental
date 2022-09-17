import s from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={s.container}>
      <div className={s.loader}></div>
    </div>
  );
}
