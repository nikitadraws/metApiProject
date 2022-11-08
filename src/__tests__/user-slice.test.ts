import { configureStore } from "@reduxjs/toolkit";
import {
  userSlice,
  replaceUserData,
  addItemToStore,
  removeItemFromStore,
} from "store/user-slice";

it("should return right user data on dispatch", () => {
  const user = {
    id: "string",
    favorites: [1, 2, 3],
  };

  const store = configureStore({ reducer: { user: userSlice.reducer } });

  store.dispatch(replaceUserData(null));
  expect(store.getState()).toEqual({ user: null });

  store.dispatch(replaceUserData(user));
  expect(store.getState()).toEqual({ user: user });

  store.dispatch(addItemToStore(4));
  expect(store.getState().user!.favorites).toEqual([...user.favorites, 4]);

  store.dispatch(removeItemFromStore(4));
  expect(store.getState().user!.favorites).toEqual([...user.favorites]);
});
