import { configureStore } from "@reduxjs/toolkit";
import { dataSlice, replaceData } from "store/data-slice";

it("should return right items data on dispatch", () => {
  const item = {
    GalleryNumber: "string",
    artistBeginDate: "string",
    artistDisplayName: "string",
    artistEndDate: "string",
    department: "string",
    dimensions: "string",
    isHighlight: true,
    isPublicDomain: true,
    medium: "string",
    objectEndDate: 1,
    objectID: 1,
    objectURL: "string",
    primaryImage: "string",
    primaryImageSmall: "string",
    title: "string",
  };

  const store = configureStore({ reducer: { data: dataSlice.reducer } });

  store.dispatch(replaceData([item, item]));

  expect(store.getState()).toEqual({ data: [item, item] });
});
