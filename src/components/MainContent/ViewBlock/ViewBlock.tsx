import React from "react";
import { URLSearchParamsInit } from "react-router-dom";
import "./ViewBlock.scss";

interface ViewBlockProps {
  setShowAllItems: React.Dispatch<React.SetStateAction<boolean>>;
  setListView: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?:
      | {
          replace?: boolean | undefined;
          state?: any;
        }
      | undefined
  ) => void;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  modifiedQuery: (arg: object) => {};
}

export function ViewBlock({
  setShowAllItems,
  setListView,
  setSearchParams,
  setPageSize,
  setCurrentPage,
  modifiedQuery,
}: ViewBlockProps) {
  return (
    <div className="ViewBlock">
      <div className="ViewBlock__container">
        <img
          className="ViewBlock__image"
          src={require("icons/tiles.png")}
          onClick={() => {
            setListView(false);
            setSearchParams(modifiedQuery({ view: "tile" }), {
              replace: true,
            });
          }}
        />

        <img
          className="ViewBlock__image"
          src={require("icons/lists.png")}
          onClick={() => {
            setListView(true);
            setSearchParams(modifiedQuery({ view: "list" }), {
              replace: true,
            });
          }}
        />
      </div>
      <div className="ViewBlock__text-box">
        <p
          className="ViewBlock__text"
          onClick={() => {
            setCurrentPage(1);
            setPageSize(20);
            setSearchParams(
              modifiedQuery({
                pageSize: "20",
                showAllItems: "false",
                currentPage: 1,
              }),
              { replace: true }
            );
            setShowAllItems(false);
          }}
        >
          20
        </p>
        <p
          className="ViewBlock__text"
          onClick={() => {
            setCurrentPage(1);
            setPageSize(50);
            setSearchParams(
              modifiedQuery({
                pageSize: "50",
                showAllItems: "false",
                currentPage: 1,
              }),
              { replace: true }
            );
            setShowAllItems(false);
          }}
        >
          50
        </p>
        <p
          className="ViewBlock__text"
          onClick={() => {
            setCurrentPage(1);
            setPageSize(20);
            setSearchParams(
              modifiedQuery({
                pageSize: "20",
                showAllItems: "true",
                currentPage: 1,
              }),
              {
                replace: true,
              }
            );
            setShowAllItems(true);
          }}
        >
          all
        </p>
      </div>
    </div>
  );
}
