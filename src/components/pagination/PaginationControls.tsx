import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirectionProps } from "../../lib/type";
import PaginationButton from "./PaginationButton";

type PaginationControlsProps = {
  onChangePage: (text: PageDirectionProps) => void;
  totalPageCount: number;
  currentPage: number;
};

export default function PaginationControls({ onChangePage, totalPageCount, currentPage }: PaginationControlsProps) {
  return <section className="pagination">
    {
      currentPage > 1 &&
      <PaginationButton onClick={() => onChangePage('prev')} isDisabled={currentPage === 1} className="pagination__button">
        <ArrowLeftIcon /> Page {currentPage - 1}
      </PaginationButton>
    }
    {totalPageCount > currentPage &&
      <PaginationButton onClick={() => onChangePage('next')} isDisabled={(currentPage === totalPageCount) || totalPageCount === 0} className="pagination__button pagination__button--next">
        Page {currentPage + 1}<ArrowRightIcon />
      </PaginationButton>
    }
  </section>;
}

