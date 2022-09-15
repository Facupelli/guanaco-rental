import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDate } from "../redux/features/pickupDate/pickupDateSlice";
import { generateAllDates } from "../utils/dates_functions";

export const useDateRange = () => {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState(null);

  useEffect(() => {
    if (dateRange) {
      const allDates = generateAllDates(dateRange);

      dispatch(setDate(allDates));
    }
  }, [dateRange, dispatch]);

  return { dateRange, setDateRange };
};
