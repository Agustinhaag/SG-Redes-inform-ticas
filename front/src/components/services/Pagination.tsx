import { PaginationProps } from "@/helpers/types";
import React from "react";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  productsPage,
  setCurrentPage,
  totalProducts,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalProducts! / productsPage); i++) {
    pageNumbers.push(i);
  }

  const onPreviusPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const specificPage = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <nav
      aria-label="Page navigation example"
      className="w-full flex justify-between my-3 text-gray-400"
    >
      <button
        onClick={onPreviusPage}
        type="button"
        disabled={currentPage === 1 ? true : false}
        className={`flex items-center text-base  justify-center border px-3 py-1.5 rounded sm:w-24 w-[75px] text-black  hover:border-custom-blue hover:bg-custom-blue hover:text-custom-white transition-all ${
          currentPage === 1
            ? "text-gray-400 hover:bg-inherit hover:border-inherit hover:text-gray-400 "
            : ""
        }`}
      >
        Anterior
      </button>
      <ul className="md:flex hidden md:mx-1 mx-0 gap-2 bg-transparent ">
        {pageNumbers.map((page: number) => (
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
      </ul>

      <button
        onClick={onNextPage}
        type="button"
        disabled={currentPage >= pageNumbers.length ? true : false}
        className={`flex items-center text-base  justify-center border px-3 py-1.5 rounded sm:w-24 w-[80px]   hover:border-custom-blue hover:bg-custom-blue hover:text-custom-white transition-all  ${
          currentPage >= pageNumbers.length
            ? "text-gray-400 hover:bg-inherit hover:border-inherit hover:text-gray-400 "
            : ""
        }`}
      >
        Siguiente
      </button>
    </nav>
  );
};

export default Pagination;
