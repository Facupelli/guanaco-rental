import { useDispatch, useSelector } from "react-redux";
import {
  nextPage,
  previousPage,
} from "../../redux/features/orders/ordersSlice";

import s from "./PaginationArrows.module.scss";

export default function PaginationArrows({ users, skip, setSkip, totalCount }) {
  const dispatch = useDispatch();

  return (
    <div className={s.pagination_btns_wrapper}>
      <button
        type="button"
        onClick={() => {
          if (skip >= 10) {
            if (users) {
              setSkip((prev) => prev - 10);
            } else {
              dispatch(previousPage());
            }
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
            if (users) {
              setSkip((prev) => prev + 10);
            } else {
              dispatch(nextPage());
            }
          }
        }}
        disabled={skip + 10 >= totalCount}
      >
        {"->"}
      </button>
    </div>
  );
}
