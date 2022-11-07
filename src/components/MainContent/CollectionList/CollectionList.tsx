import React, { useCallback, useMemo, useRef } from "react";
import { useClickListener } from "hooks/useClickListener";
import { Item, UserData } from "store/api-slice";
import { useListAnimation } from "hooks/useListAnimation";
import "./CollectionList.scss";

interface CollectionListProps {
  userData: UserData | null;
  filteredData: Item[];
  pageSize: number;
  currentPage: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  divRef: React.RefObject<HTMLDivElement>;
  listView: boolean;
  showAllItems: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export function CollectionList({
  userData,
  filteredData,
  pageSize,
  currentPage,
  setPageSize,
  divRef,
  listView,
  showAllItems,
  setLoading,
  loading,
}: CollectionListProps) {
  const [ulRef2, favoriteToAddID] = useClickListener();
  const observer = useRef<IntersectionObserver | null>(null);
  const animation = new Array(pageSize).fill(0).map((_el, i) => i);

  const currentTableData = useMemo(() => {
    if (filteredData) {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return filteredData.slice(firstPageIndex, lastPageIndex);
    }
    return;
  }, [currentPage, filteredData, pageSize, userData]);

  useListAnimation(
    divRef,
    currentTableData,
    filteredData,
    userData,
    listView,
    showAllItems,
    currentPage,
    pageSize,
    setLoading,
    favoriteToAddID
  );

  const handleChecked = (objectID: number): [string, string] => {
    if (userData) {
      return userData.favorites.includes(objectID)
        ? [require("icons/favorite-added.png"), "true"]
        : [require("icons/favorite-to-add.png"), "false"];
    } else {
      return [require("icons/favorite-disabled.png"), ""];
    }
  };

  const lastElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageSize((prev) => prev + 20);
          setLoading(true);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, filteredData]
  );

  return (
    <ul
      id="flipList"
      className="CollectionList"
      ref={ulRef2}
      style={
        {
          "--column-width": listView ? 580 : 140,
          "--column-width-tablet": listView ? 385 : 140,
          "--column-width-mobile": listView ? 310 : 120,
        } as React.CSSProperties
      }
    >
      {filteredData.length ? (
        animation.map((num) => {
          return (
            currentTableData &&
            currentTableData[num] && (
              <li
                className={
                  listView
                    ? "CollectionList__item-list"
                    : "CollectionList__item-tile"
                }
                key={currentTableData[num].objectID}
                ref={
                  animation.length === num + 1 && showAllItems
                    ? lastElementRef
                    : null
                }
              >
                <div className="CollectionList__container-div">
                  <div className="CollectionList__image-container">
                    <img
                      key-id={currentTableData[num].objectID}
                      src={currentTableData[num].primaryImageSmall}
                      alt="artwork"
                      className="CollectionList__image"
                    />

                    <img
                      key-id={currentTableData[num].objectID}
                      favorite-check={
                        handleChecked(currentTableData[num].objectID)[1]
                      }
                      alt="favorite-icon"
                      className="CollectionList__favorite-icon"
                      src={handleChecked(currentTableData[num].objectID)[0]}
                    />
                    <div
                      className={
                        userData
                          ? "CollectionList__tooltip-user"
                          : "CollectionList__tooltip-guest"
                      }
                    ></div>
                  </div>
                </div>
                {listView && (
                  <div className="CollectionList__item-description">
                    <p className="CollectionList__item-text">
                      <span className="CollectionList__item-text CollectionList__item-text--italic">
                        Title:
                      </span>{" "}
                      {currentTableData[num].title}
                    </p>
                    <p className="CollectionList__item-text">
                      <span className="CollectionList__item-text CollectionList__item-text--italic">
                        {" "}
                        Artist Name:
                      </span>
                      {currentTableData[num].artistDisplayName === ""
                        ? "unknown"
                        : currentTableData[num].artistDisplayName}
                    </p>
                    <p className="CollectionList__item-text">
                      <span className="CollectionList__item-text CollectionList__item-text--italic">
                        Year:
                      </span>
                      {currentTableData[num].objectEndDate}
                    </p>
                    <p className="CollectionList__item-text">
                      <span className="CollectionList__item-text CollectionList__item-text--italic">
                        Medium:
                      </span>
                      {currentTableData[num].medium}
                    </p>
                  </div>
                )}
              </li>
            )
          );
        })
      ) : (
        <p>No results, please try again.</p>
      )}
    </ul>
  );
}
