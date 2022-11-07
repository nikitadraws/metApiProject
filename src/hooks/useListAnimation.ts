import { useEffect } from "react";
import { spring } from "react-flip-toolkit";
import { Item, UserData } from "store/api-slice";

interface listAnimtation {
  (
    divRef: React.RefObject<HTMLDivElement>,
    currentTableData: Item[] | undefined,
    filteredData: Item[],
    userData: UserData | null,
    listView: boolean,
    showAllItems: boolean,
    currentPage: number,
    pageSize: number,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    favoriteToAddID: string
  ): void;
}

export const useListAnimation: listAnimtation = (
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
) => {
  useEffect(() => {
    if (divRef.current && currentTableData && favoriteToAddID) {
      const items = [
        ...divRef.current.querySelectorAll<HTMLElement>(
          `[key-id="${favoriteToAddID}"]`
        ),
      ];
      items.forEach((el, i) => {
        spring({
          config: "wobbly",
          values: {
            translateY: [5, 0],
            opacity: [0.7, 1],
          },
          onUpdate: ({ translateY, opacity }) => {
            el.style.opacity = opacity;
            el.style.transform = `translateY(${translateY}px)`;
          },
          delay: i * 80,
        });
      });
    }
  }, [userData]);

  useEffect(() => {
    if (divRef.current && currentTableData) {
      const items = [
        ...divRef.current.querySelectorAll<HTMLElement>(
          ".CollectionList__item-list, .CollectionList__item-tile"
        ),
      ];

      items.forEach((el, i) => {
        spring({
          config: "wobbly",
          values: {
            translateY: [-15, 0],
            opacity: [0, 1],
          },
          onUpdate: ({ translateY, opacity }) => {
            el.style.opacity = opacity;
            el.style.transform = `translateY(${translateY}px)`;
          },
          delay: i * 30,
          onComplete: () => {
            if (items.length === i + 1) {
              setLoading(false);
            }
          },
        });
      });
    }
  }, [filteredData, listView, showAllItems, currentPage]);

  useEffect(() => {
    if (divRef.current && currentTableData && showAllItems) {
      const items = showAllItems
        ? [
            ...divRef.current.querySelectorAll<HTMLElement>(
              "CollectionList__item-list, .CollectionList__item-tile"
            ),
          ].slice(pageSize - 20, pageSize)
        : [
            ...divRef.current.querySelectorAll<HTMLElement>(
              "CollectionList__item-list, .CollectionList__item-tile"
            ),
          ];
      items.forEach((el, i) => {
        spring({
          config: "wobbly",
          values: {
            translateY: [-15, 0],
            opacity: [0, 1],
          },
          onUpdate: ({ translateY, opacity }) => {
            el.style.opacity = opacity;
            el.style.transform = `translateY(${translateY}px)`;
          },
          delay: i * 40,
          onComplete: () => {
            if (items.length === i + 1) {
              setLoading(false);
            }
          },
        });
      });
    }
  }, [pageSize]);
};
