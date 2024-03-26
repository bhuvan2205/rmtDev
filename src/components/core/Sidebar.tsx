import { JobItem, PageDirectionProps, SortMethods } from "../../lib/type";
import JobList from "../jobItems/JobList";
import PaginationControls from "../pagination/PaginationControls";
import ResultsCount from "../search/ResultsCount";
import SortingControls from "../sorting/SortingControls";

type SidebarProps = {
  jobItems: JobItem[];
  jobItemResults: number;
  isLoading: boolean;
  onChangePage: (text: PageDirectionProps) => void;
  totalPageCount: number;
  currentPage: number;
  handleChangeSort: (text: SortMethods) => void;
  sortBy: SortMethods;
};

export default function Sidebar({ jobItems, isLoading, jobItemResults, onChangePage, totalPageCount, currentPage, handleChangeSort, sortBy }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount jobItemResults={jobItemResults} />
        <SortingControls onClick={handleChangeSort} sortBy={sortBy} />
      </div>
      <JobList jobItems={jobItems} isLoading={isLoading} />
      <PaginationControls onChangePage={onChangePage} totalPageCount={totalPageCount} currentPage={currentPage} />
    </div>
  );
}
