import React from "react";
import { MainContent } from "components/MainContent/MainContent";
import { RootState } from "store";
import { shallowEqual, useSelector } from "react-redux";
import { Loading } from "components/Loading/Loading";

export function Collection() {
  const apiData = useSelector((state: RootState) => state.data, shallowEqual);
  const userData = useSelector((state: RootState) => state.user);

  if (!apiData) {
    return <Loading />;
  }

  return (
    <>
      <MainContent data={apiData} userData={userData} />
    </>
  );
}
