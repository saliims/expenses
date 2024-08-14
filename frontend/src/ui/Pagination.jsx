import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constant";

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-full flex items-center justify-between mt-4">
      {/* Information about the current page range */}
      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 ml-2">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>

      {/* Pagination Buttons */}
      <div className="flex gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm md:text-base font-medium transition-colors 
            ${
              currentPage === 1
                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
          <span>Previous</span>
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm md:text-base font-medium transition-colors 
            ${
              currentPage === pageCount
                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
        >
          <span>Next</span>
          <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
