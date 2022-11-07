import React from "react";
import { MainContent } from "components/MainContent/MainContent";
import { useSelector } from "react-redux";
import { Loading } from "components/Loading/Loading";
import { RootState } from "store";

export function MyCollection() {
  const apiData = useSelector((state: RootState) => state.data);
  const userData = useSelector((state: RootState) => state.user);

  if (!apiData || !userData) {
    return <Loading />;
  }

  const favoriteItems = apiData.filter((el) =>
    userData.favorites.includes(el.objectID)
  );

  return (
    <>
      <MainContent data={favoriteItems} userData={userData} />
    </>
  );
}
