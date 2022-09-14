import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../redux/features/user/userSlice";
import { getUniqueUser } from "../utils/fetch_users";

export const useGetUserRole = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.user.data.role);

  const { data: session } = useSession();

  useEffect(() => {
    if (!userRole) {
      getUniqueUser(session.user.email).then((res) => dispatch(setUserId(res)));
    }
  }, [session?.user, userRole, dispatch]);

  return { userRole };
};
