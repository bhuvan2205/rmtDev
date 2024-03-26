import { useJobItemsContext } from "../../lib/hooks";
import JobList from "../jobItems/JobList";
import PaginationControls from "../pagination/PaginationControls";
import ResultsCount from "../search/ResultsCount";
import SortingControls from "../sorting/SortingControls";

export default function Sidebar() {
  const { isLoading, sortedAndSlicedJobItems } = useJobItemsContext()
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount />
        <SortingControls />
      </div>
      <JobList isLoading={isLoading} jobItems={sortedAndSlicedJobItems} />
      <PaginationControls />
    </div>
  );
}
