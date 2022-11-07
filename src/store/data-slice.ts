import { createSlice } from '@reduxjs/toolkit'
import { Item } from './api-slice';

type DataState = Item[] | null;

const initialState: DataState = null;

export const dataSlice = createSlice({
  name: "data",
  initialState: initialState as DataState,
  reducers: {
    replaceData(state, { payload }: { payload: Item[] }) {
      state = payload;
      return state;
    },
  },
});

export const { replaceData } = dataSlice.actions;

 
