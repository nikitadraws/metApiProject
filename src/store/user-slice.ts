import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "./api-slice";

export type UserState = UserData | null;

const initialState: UserState = null;

export const userSlice = createSlice({
  name: "user",
  initialState: initialState as UserState,
  reducers: {
    replaceUserData(state, { payload }: { payload: UserState }) {
      if (payload) {
        state = { ...payload };
        return state;
      } else return null;
    },
    addItemToStore(state, { payload }: { payload: number }) {
      if (state) {
        state.favorites.push(payload);
      }
      return state;
    },
    removeItemFromStore(state, { payload }: { payload: number }) {
      if (state) {
        const index = state.favorites.indexOf(payload);
        if (index > -1) {
          state.favorites.splice(index, 1);
        }
      }
      return state;
    },
  },
});

export const { replaceUserData, addItemToStore, removeItemFromStore } =
  userSlice.actions;
