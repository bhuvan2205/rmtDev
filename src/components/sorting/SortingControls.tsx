import { SortMethods } from "../../lib/type";
import SortingButtons from "./SortingButton";

type SortingControlsProps = {
  onClick: (text: SortMethods) => void;
  sortBy: SortMethods;
};

export default function SortingControls({ onClick, sortBy }: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButtons className={`sorting__button sorting__button--relevant ${sortBy === 'relevant' && 'sorting__button--active'}`} onClick={() => onClick('relevant')}>
        Relevant
      </SortingButtons>
      <SortingButtons className={`sorting__button sorting__button--recent ${sortBy === 'recent' && 'sorting__button--active'}`} onClick={() => onClick('recent')}>
        Recent
      </SortingButtons>
    </section>
  );
}