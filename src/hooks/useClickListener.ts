import { useAuth } from "contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useAddItemMutation, useRemoveItemMutation } from "store/api-slice";
import { addItemToStore, removeItemFromStore } from "store/user-slice";

export function useClickListener(): [
  React.RefObject<HTMLUListElement>,
  string
] {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [addItemToDatabase] = useAddItemMutation();
  const [removeItemFromDatabase] = useRemoveItemMutation();
  const [favoriteToAddID, setFavoriteToAddID] = useState("");
  const navigate = useNavigate();
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleChange(this: HTMLUListElement, ev: MouseEvent) {
      const element = ev.target as HTMLInputElement;

      if (
        element.alt === "favorite-icon" ||
        element.className === "FavoriteButton__container"
      ) {
        const id = parseInt(element.getAttribute("key-id")!);
        setFavoriteToAddID(element.getAttribute("key-id")!);
        if (currentUser && element.getAttribute("favorite-check") === "false") {
          dispatch(addItemToStore(id));
          addItemToDatabase({ uid: currentUser.uid, objectID: id });
        } else if (
          currentUser &&
          element.getAttribute("favorite-check") === "true"
        ) {
          dispatch(removeItemFromStore(id));
          removeItemFromDatabase({ uid: currentUser.uid, objectID: id });
        }
      } else if (element.alt === "artwork") {
        const id = "/" + element.getAttribute("key-id");
        navigate(id);
      }
    }

    if (ulRef.current) {
      ulRef.current.addEventListener("click", handleChange);
    }

    return () => {
      if (ulRef.current) {
        ulRef.current.removeEventListener("click", handleChange);
      }
    };
  }, [currentUser, dispatch, addItemToDatabase, removeItemFromDatabase]);

  return [ulRef, favoriteToAddID];
}
