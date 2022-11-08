import { useDispatch, useSelector } from "react-redux";
import {
  nextPage,
  previousPage,
} from "../../redux/features/orders/ordersSlice";
import s from "./PaginationArrows.module.scss";

export default function PaginationArrows({ totalCount }) {
  const dispatch = useDispatch();

  const skip = useSelector((state) => state.orders.skip);

  return (
    <div className={s.pagination_btns_wrapper}>
      <button
        type="button"
        onClick={() => dispatch(nextPage())}
        disabled={skip === 0}
      >
        {"<-"}
      </button>
      <button
        type="button"
        onClick={() => dispatch(previousPage())}
        disabled={skip + 10 >= totalCount}
      >
        {"->"}
      </button>
    </div>
  );
}
