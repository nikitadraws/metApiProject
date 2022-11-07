import { User } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useGetUserDataMutation,
  UserData,
  useSetNewUserMutation,
} from "store/api-slice";
import { replaceUserData } from "store/user-slice";

export const useUserData = (currentUser: User | null | undefined): void => {
  const dispatch = useDispatch();
  const [getUserData] = useGetUserDataMutation();
  const [setNewUser] = useSetNewUserMutation();

  useEffect(() => {
    const getUser = async () => {
      if (!currentUser) {
        dispatch(replaceUserData(null));
        return;
      }

      const userData: UserData = await getUserData(currentUser.uid).unwrap();

      if (!userData) {
        await setNewUser(currentUser.uid);
        const newUserData: UserData = { id: currentUser.uid, favorites: [] };
        dispatch(replaceUserData(newUserData));
        return;
      }

      dispatch(replaceUserData(userData));
    };
    getUser();
  }, [currentUser]);
};
