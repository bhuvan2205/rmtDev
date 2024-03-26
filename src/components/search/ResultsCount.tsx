import { useJobItemsContext } from "../../lib/hooks";

export default function ResultsCount() {
  const { totalJobItems } = useJobItemsContext();
  return <p className="count"><b>{totalJobItems}</b> results</p>;
}
