import React, { useEffect, useState } from "react";
import { URLSearchParamsInit } from "react-router-dom";
import "./SortFileds.scss";

interface SortFieldsProps {
  sort: string | null;
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
}

export default function SortFields({
  sort,
  setSearchParams,
  modifiedQuery,
}: SortFieldsProps) {
  const [toggleSort, setToggleSort] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  useEffect(() => {
    if (sort) {
      setToggleSort(true);
      const sortingParams = sort.split(" ");
      setSortBy(sortingParams[0]);
      setSortDirection(sortingParams[1]);
    }
  }, []);

  useEffect(() => {
    if (!sort) {
      setSortBy("");
      setSortDirection("");
    }
  }, [sort]);

  const handleSort = (sortString: string) => {
    if (sortBy !== sortString) {
      setSortDirection(() => {
        return "up";
      });
      setSearchParams(
        modifiedQuery({ sort: `${sortString} up`, currentPage: 1 }),
        {
          replace: true,
        }
      );
    }

    if (sortBy === sortString) {
      setSearchParams(
        modifiedQuery({
          sort: `${sortString} ${sortDirection === "up" ? "down" : "up"}`,
          currentPage: 1,
        }),
        {
          replace: true,
        }
      );
      setSortDirection((prev) => {
        return prev === "up" ? "down" : "up";
      });
    }

    setSortBy(sortString);
  };

  return (
    <>
      <p
        onClick={() => setToggleSort((state) => !state)}
        className="SortFields__title"
      >
        Sort
      </p>
      {toggleSort && (
        <>
          <div
            className="SortFields"
            style={
              {
                "--arrow-direction":
                  sortDirection === "up" ? "270deg" : "90deg",
              } as React.CSSProperties
            }
          >
            <div
              className="SortFields__item"
              onClick={() => handleSort("title")}
            >
              Artwork name{" "}
              {sortBy === "title" && (
                <img
                  className="SortFields__icon"
                  src={require("icons/arrow-small.png")}
                />
              )}
            </div>
            <div
              className="SortFields__item"
              onClick={() => handleSort("artistDisplayName")}
            >
              Author name{" "}
              {sortBy === "artistDisplayName" && (
                <img
                  className="SortFields__icon"
                  src={require("icons/arrow-small.png")}
                />
              )}
            </div>

            <div
              className="SortFields__item"
              onClick={() => handleSort("objectEndDate")}
            >
              Artwork date{" "}
              {sortBy === "objectEndDate" && (
                <img
                  className="SortFields__icon"
                  src={require("icons/arrow-small.png")}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
