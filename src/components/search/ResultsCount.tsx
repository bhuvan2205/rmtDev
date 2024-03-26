export default function ResultsCount({ jobItemResults }: { jobItemResults: number; }) {
  return <p className="count"><b>{jobItemResults}</b> results</p>;
}
