import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { db } from "FirebaseConfig";

export interface UserData {
  id: string;
  favorites: number[];
}

export interface UpadateFavorites {
  uid: string;
  objectID: number;
}

export interface Item {
  GalleryNumber: string;
  artistBeginDate: string;
  artistDisplayName: string;
  artistEndDate: string;
  department: string;
  dimensions: string;
  isHighlight: boolean;
  isPublicDomain: boolean;
  medium: string;
  objectEndDate: number;
  objectID: number;
  objectURL: string;
  primaryImage: string;
  primaryImageSmall: string;
  title: string;
}

export const dataApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://met-api-dev-default-rtdb.europe-west1.firebasedatabase.app/data",
  }),
  endpoints: (build) => ({
    getApiData: build.query<Item[], void>({
      query: () => "/.json",
    }),
    getUserData: build.mutation<UserData, string>({
      async queryFn(uid) {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        const user = docSnap.data() as UserData;
        return { data: user };
      },
    }),
    setNewUser: build.mutation<{}, string>({
      async queryFn(uid) {
        const userToAdd = { id: uid, favorites: [] } as UserData;
        const docRef = doc(db, "users", uid);
        await setDoc(docRef, userToAdd);
        return { data: {} };
      },
    }),
    addItem: build.mutation<{}, UpadateFavorites>({
      async queryFn(itemToAdd) {
        const docRef = doc(db, "users", itemToAdd.uid);
        await updateDoc(docRef, {
          favorites: arrayUnion(itemToAdd.objectID),
        });
        return { data: {} };
      },
    }),
    removeItem: build.mutation<{}, UpadateFavorites>({
      async queryFn(itemToRemove) {
        const docRef = doc(db, "users", itemToRemove.uid);
        await updateDoc(docRef, {
          favorites: arrayRemove(itemToRemove.objectID),
        });
        return { data: {} };
      },
    }),
  }),
});

export const {
  useGetApiDataQuery,
  useGetUserDataMutation,
  useSetNewUserMutation,
  useAddItemMutation,
  useRemoveItemMutation,
} = dataApi;
