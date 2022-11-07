import { useMemo } from "react";

interface UsePagintaionProps {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}

export const DOTS = 1111;

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount,
  currentPage,
}: UsePagintaionProps) => {
  const range = (start: number, end: number): number[] => {
    let length = end - start + 1;

    // создаем массив с необходимым количеством элементов для пагинации
    return Array.from({ length }, (_, i) => i + start);
  };

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Максимальное количество элементов в пагинации siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    // siblingCount - количество страниц справа и слева от текущей
    const totalPageNumbers = siblingCount + 5;

    // кейс 1 - страниц меньше чем totalPageNumbers - показываем все страницы
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // вычисление ближайших чисел слева и справа от текущей страницы
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    // константы, которые определяют нужны ли точки с каждой стороны
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // кейс 2 - точки только справа
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    // кейс 3 - точки только слева
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // кейс 4 - точки слева и справа
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    return [];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
