import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import PaginationButton from "./PaginationButton";
import { useJobItemsContext } from "../../lib/hooks";

export default function PaginationControls() {
  const { currentPage, totalPageCount, handleChangePage } = useJobItemsContext();
  return <section className="pagination">
    {
      currentPage > 1 &&
      <PaginationButton onClick={() => handleChangePage('prev')} isDisabled={currentPage === 1} className="pagination__button">
        <ArrowLeftIcon /> Page {currentPage - 1}
      </PaginationButton>
    }
    {totalPageCount > currentPage &&
      <PaginationButton onClick={() => handleChangePage('next')} isDisabled={(currentPage === totalPageCount) || totalPageCount === 0} className="pagination__button pagination__button--next">
        Page {currentPage + 1}<ArrowRightIcon />
      </PaginationButton>
    }
  </section>;
}

