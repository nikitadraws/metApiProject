import { useEffect, useMemo } from "react";
import { Item, UserData } from "store/api-slice";
import { filterFunction } from "../utils/filterFunction";

interface FilterProps {
  searchParams: URLSearchParams;
  userData: UserData | null;
  data: Item[];
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setShowAllItems: React.Dispatch<React.SetStateAction<boolean>>;
  setListView: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

// хук фильтрует и сортирует дату, беря данные из query в URL
export const useFilter = ({
  searchParams,
  userData,
  data,
  setPageSize,
  setShowAllItems,
  setListView,
  setCurrentPage,
}: FilterProps): [Item[] | null, (arg: object) => {}] => {

  // фильтр и сортировка даты при маунте - если была перезагрузка страницы или переход по ссылке
  useEffect(() => {
    const size = searchParams.get("pageSize");
    const allItems = searchParams.get("showAllItems");
    const view = searchParams.get("view");
    const pageNumber = searchParams.get("currentPage");

    if (size) {
      setPageSize(parseInt(size, 10));
    }
    if (allItems === "true") {
      setShowAllItems(true);
    }
    if (view === "list") {
      setListView(true);
    }
    if (pageNumber) {
      setCurrentPage(
        parseInt(pageNumber, 10) > 0 ? parseInt(pageNumber, 10) : 1
      );
    }
  }, []);

  // библиотека для работы с query
  const queryString = require("query-string");

  // объект с данными из query 
  const query: object = useMemo(
    () => queryString.parse(window.location.search),
    [searchParams]
  );

  // функция, которая обновляет объект, для дальнейшей передачи его в query
  const modifiedQuery = (arg: object) => {
    return { ...query, ...arg };
  };

  // функция, которая фильрует и сортирует дату при изменении query или даты пользователя
  const filteredData = useMemo(
    () => filterFunction(data, query),
    [query, userData]
  );

  return [filteredData, modifiedQuery];
};
