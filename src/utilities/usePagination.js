import { useMemo } from "react";

export const usePagination = (
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
) => {
  const paginationRange = useMemo(() => {
    const DOTS = "...";
    const totalPageCount = Math.ceil(totalCount / pageSize);
    if (totalCount === undefined || !currentPage === undefined) {
      return [];
    }
    console.log("count: ", totalCount, "pageSize: ", pageSize, "sib: ", siblingCount, "cur: ", currentPage);
    // Pagination with hidden pages when too many
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;
    var pageRange = [];

    if (totalPageNumbers >= totalPageCount) {
      pageRange = range(1, totalPageCount);
      console.log("0: ", pageRange);
      return pageRange;
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      pageRange =  [...leftRange, DOTS, totalPageCount];
      console.log("1: ", pageRange);
      return pageRange;
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      pageRange =  [firstPageIndex, DOTS, ...rightRange];
      console.log("2: ", pageRange);
      return pageRange;
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      pageRange =  [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      console.log("3: ", pageRange);
      return pageRange;
    }

  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
}, DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
}
