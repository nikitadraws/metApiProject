import React, { useEffect, useState } from "react";
import { ArtworkBlock } from "pages/ArtworkPage/components/ArtworkBlock";
import { NotFound } from "pages/NotFound/NotFound";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Item } from "store/api-slice";
import { RootState } from "store";
import { Loading } from "components/Loading/Loading";

export function ArtworkPage() {
  const [itemToShare, setItemToShare] = useState<Item[] | undefined>();
  const apiData = useSelector((state: RootState) => state.data);
  const { id } = useParams();

  useEffect(() => {
    if (apiData && id) {
      setItemToShare(apiData.filter((el) => el.objectID === parseInt(id, 10)));
    }
  }, [apiData, id]);

  if (!apiData || !itemToShare) {
    return <Loading />;
  }

  return itemToShare[0] ? (
    <ArtworkBlock artworkData={itemToShare[0]} />
  ) : (
    <NotFound />
  );
}
