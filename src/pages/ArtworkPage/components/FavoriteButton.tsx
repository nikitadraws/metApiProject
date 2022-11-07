import React from "react";
import { useClickListener } from "hooks/useClickListener";
import { useNavigate } from "react-router";
import { RootState } from "store";
import { useSelector } from "react-redux";
import "./FavoriteButton.scss";

interface FavoriteButtonProps {
  objectID: number;
}

export function FavoriteButton({ objectID }: FavoriteButtonProps) {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);

  const [ulRef, _str] = useClickListener();

  const handleChecked = (objectID: number): [string, string] => {
    if (userData) {
      return userData.favorites.includes(objectID)
        ? [require("icons/favorite-added.png"), "true"]
        : [require("icons/favorite-to-add.png"), "false"];
    } else {
      return [require("icons/favorite-disabled.png"), ""];
    }
  };

  return (
    <ul ref={ulRef} className="FavoriteButton">
      {userData ? (
        <div
          className="FavoriteButton__container"
          key-id={objectID}
          favorite-check={handleChecked(objectID)[1]}
        >
          <img
            key-id={objectID}
            favorite-check={handleChecked(objectID)[1]}
            alt="favorite-icon"
            className="FavoriteButton__icon"
            src={handleChecked(objectID)[0]}
          />
        </div>
      ) : (
        <div
          className="FavoriteButton__login"
          onClick={() => {
            navigate("/login", { replace: false });
          }}
        >
          Please login to add favorites
        </div>
      )}
    </ul>
  );
}
