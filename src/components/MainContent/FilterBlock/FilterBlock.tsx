import React from "react";
import { URLSearchParamsInit } from "react-router-dom";
import SortFields from "./SortFields";
import FilterFields from "./FilterFields";
import "./FilterBlock.scss";

interface FilterBlockProps {
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?:
      | {
          replace?: boolean | undefined;
          state?: any;
        }
      | undefined
  ) => void;
  modifiedQuery: (arg: object) => {};
  slider: string | null;
  isHighlight: string | null;
  isPublicDomain: string | null;
  sort: string | null;
}

export const FilterBlock = ({
  setSearchParams,
  modifiedQuery,
  slider,
  isHighlight,
  isPublicDomain,
  sort,
}: FilterBlockProps) => {
  return (
    <div className="FilterBlock">
      <FilterFields
        slider={slider}
        isHighlight={isHighlight}
        isPublicDomain={isPublicDomain}
        setSearchParams={setSearchParams}
        modifiedQuery={modifiedQuery}
      />
      <SortFields
        sort={sort}
        setSearchParams={setSearchParams}
        modifiedQuery={modifiedQuery}
      />
    </div>
  );
};
