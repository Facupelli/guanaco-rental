import s from "./Table.module.scss";

export default function Table({ trTitles = [], children }) {
  return (
    <table className={s.table}>
      <thead>
        <tr>
          {trTitles.length > 0 &&
            trTitles.map((title) => <th key={title}>{title}</th>)}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
