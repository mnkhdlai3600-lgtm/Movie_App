"use client";

import { usePaginationHook } from "@/app/_hook/usePaginationHook";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";

export function DynamicPagination() {
  const {
    handlePrevious,
    handleNext,
    handlePageChange,
    totalPages,
    displayPages,
    currentPage,
  } = usePaginationHook();

  return (
    <Pagination className="w-full flex justify-end items-end">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                handlePrevious();
              }}
              href=""
            />
          </PaginationItem>
        )}

        {displayPages.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href=""
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(pageNum)();
              }}
              className={cn(
                "cursor-pointer",
                pageNum === currentPage &&
                  "bg-gray-200 font-semibold pointer-events-none"
              )}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
              href=""
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
