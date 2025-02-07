import { PaginationProps } from "@/helpers/types";
import React from "react";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  productsPage,
  setCurrentPage,
  totalProducts,
}) => {
  const totalPages = Math.ceil(totalProducts! / productsPage);
  const visiblePages = 4;
  const pageNumbers: number[] = [];

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (endPage - startPage < visiblePages - 1) {
    if (startPage === 1) {
      endPage = Math.min(startPage + visiblePages - 1, totalPages);
    } else if (endPage === totalPages) {
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const onPreviusPage = () => setCurrentPage(currentPage - 1);
  const onNextPage = () => setCurrentPage(currentPage + 1);
  const specificPage = (page: number) => setCurrentPage(page);

  return (
    <nav className="w-full flex justify-between my-3 text-gray-400">
      <button
        onClick={onPreviusPage}
        disabled={currentPage === 1}
        className={`flex items-center text-base justify-center border px-3 py-1.5 rounded sm:w-24 w-[75px] text-custom-white hover:border-custom-blue hover:bg-custom-blue hover:text-custom-white transition-all ${
          currentPage === 1
            ? "text-gray-400 hover:bg-inherit hover:border-inherit hover:text-gray-400"
            : ""
        }`}
      >
        Anterior
      </button>

      <ul className="md:flex hidden md:mx-1 mx-0 gap-2 bg-transparent">
        {startPage > 1 && (
          <>
            <li>
              <button
                type="button"
                className="flex items-center sm:text-base text-xs justify-center border sm:px-3 w-9 py-1 rounded hover:border-custom-blue hover:bg-custom-blue hover:text-custom-white transition-all"
                onClick={() => specificPage(1)}
              >
                1
              </button>
            </li>
            {startPage > 2 && <span className="text-gray-500">...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={`flex items-center sm:text-base text-xs justify-center border sm:px-3 w-9 py-1 rounded hover:border-custom-blue hover:bg-custom-blue hover:text-custom-white transition-all ${
                currentPage === page
                  ? "border-custom-blue bg-custom-blue text-custom-white"
                  : ""
              }`}
              onClick={() => specificPage(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="text-gray-500">...</span>
            )}
            <li>
              <button
                type="button"
                className="flex items-center sm:text-base text-xs justify-center border sm:px-3 w-9 py-1 rounded hover:border-custom-blue hover:bg-custom-blue hover:text-custom-white transition-all"
                onClick={() => specificPage(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
      </ul>

      <button
        onClick={onNextPage}
        disabled={currentPage >= totalPages}
        className={`flex items-center text-base justify-center border px-3 py-1.5 rounded sm:w-24 w-[80px] hover:border-custom-blue hover:bg-custom-blue hover:text-custom-white transition-all ${
          currentPage >= totalPages
            ? "text-gray-400 hover:bg-inherit hover:border-inherit hover:text-gray-400"
            : ""
        }`}
      >
        Siguiente
      </button>
    </nav>
  );
};

export default Pagination;
