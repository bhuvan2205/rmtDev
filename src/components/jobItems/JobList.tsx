import { useActiveJobItemId } from "../../lib/hooks";
import { JobItem } from "../../lib/type";
import JobListItem from "./JobListItem";
import Spinner from "../ui/Spinner";

type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  const { activeJobItemId } = useActiveJobItemId();
  return <ul className="job-list">
    {isLoading && <Spinner />}

    {!isLoading && jobItems?.map((jobItem =>
      (<JobListItem key={jobItem.id} jobItem={jobItem} isActive={activeJobItemId === jobItem.id} />)
    ))}
  </ul>;
}

export default JobList;
