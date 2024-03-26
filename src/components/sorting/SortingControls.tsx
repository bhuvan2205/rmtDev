import { useJobItemsContext } from "../../lib/hooks";
import SortingButtons from "./SortingButton";

export default function SortingControls() {
  const { sortBy, handleChangeSort } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButtons className={`sorting__button sorting__button--relevant ${sortBy === 'relevant' ? 'sorting__button--active' : ''}`} onClick={() => handleChangeSort('relevant')}>
        Relevant
      </SortingButtons>
      <SortingButtons className={`sorting__button sorting__button--recent ${sortBy === 'recent' ? 'sorting__button--active' : ''}`} onClick={() => handleChangeSort('recent')}>
        Recent
      </SortingButtons>
    </section >
  );
}