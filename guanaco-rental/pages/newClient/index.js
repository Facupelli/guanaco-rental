import { useUser } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompleteProfileModal from "../../components/CompleteProfileModal/CompleteProfileModal";
import Nav from "../../components/Nav/Nav";
import { getOrCreateUser } from "../../utils/fetch_users";
import { setUserId } from "../../redux/features/user/userSlice";

import s from "../../styles/NewClientPage.module.scss";

export default function newClientPage() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      if (!userData) {
        getOrCreateUser(user).then((res) => dispatch(setUserId(res)));
      }
    }
  }, [user]);

  return (
    <div>
      <Nav />
      <CompleteProfileModal user={userData} />
    </div>
  );
}
