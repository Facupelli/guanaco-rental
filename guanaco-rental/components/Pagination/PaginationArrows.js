import s from "./PaginationArrows.module.scss";

export default function PaginationArrows({skip, setSkip, totalCount}) {
  return (
    <div className={s.pagination_btns_wrapper}>
      <button
        type="button"
        onClick={() => {
          if (skip >= 10) {
            setSkip((prev) => prev - 10);
          }
        }}
        disabled={skip === 0}
      >
        {"<-"}
      </button>
      <button
        type="button"
        onClick={() => {
          if (skip + 10 < totalCount) {
            setSkip((prev) => prev + 10);
          }
        }}
        disabled={skip + 10 >= totalCount}
      >
        {"->"}
      </button>
    </div>
  );
}
