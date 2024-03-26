import { JobItem, PageDirectionProps, SortMethods } from "../../lib/type";
import JobItemContent from "../jobItems/JobItemContent";
import Sidebar from "./Sidebar";

type ContainerProps = {
  jobItems: JobItem[];
  isLoading: boolean;
  jobItemResults: number;
  onChangePage: (text: PageDirectionProps) => void;
  totalPageCount: number;
  currentPage: number;
  handleChangeSort: (text: SortMethods) => void;
  sortBy: SortMethods;
};

export default function Container({ jobItems, isLoading, jobItemResults, onChangePage, totalPageCount, currentPage, handleChangeSort, sortBy }: ContainerProps) {
  return <div className="container">
    <Sidebar jobItemResults={jobItemResults} jobItems={jobItems} isLoading={isLoading} onChangePage={onChangePage} totalPageCount={totalPageCount} currentPage={currentPage} handleChangeSort={handleChangeSort} sortBy={sortBy} />
    <JobItemContent />
  </div>;
}
