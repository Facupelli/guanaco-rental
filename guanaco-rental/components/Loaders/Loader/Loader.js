import s from "./Loader.module.scss";

export default function Loader({ small }) {
  return (
    <div className={s.container}>
      <div className={`${s.loader} ${small ? s.small : s.default}`}></div>
    </div>
  );
}
