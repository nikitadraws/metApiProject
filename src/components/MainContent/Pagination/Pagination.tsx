import React from "react";
import { usePagination, DOTS } from "./usePagination";
import "./Pagination.scss";

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
}

export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul className="Pagination">
      {currentPage !== 1 && (
        <li key={1} className="Pagination__item" onClick={onPrevious}>
          <img
            className="Pagination__arrow Pagination__arrow--left"
            src={require("icons/arrow-small.png")}
          />
        </li>
      )}
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return <li key={i}>&#8230;</li>;
        }

        return (
          <li
            key={i}
            className={
              pageNumber === currentPage
                ? "Pagination__item-current"
                : "Pagination__item"
            }
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {currentPage !== paginationRange[paginationRange.length - 1] && (
        <li key={100} className="Pagination__item" onClick={onNext}>
          <img
            className="Pagination__arrow Pagination__arrow--right"
            src={require("icons/arrow-small.png")}
          />
        </li>
      )}
    </ul>
  );
};
