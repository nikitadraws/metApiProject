import { configureStore } from "@reduxjs/toolkit";
import { dataApi } from "./api-slice";
import { dataSlice } from "./data-slice";
import { userSlice } from "./user-slice";

const store = configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
    data: dataSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
