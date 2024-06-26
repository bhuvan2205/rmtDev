import { useBookmarkContext } from "../../lib/hooks";
import { JobItem } from "../../lib/type";
import BookmarkIcon from "../bookmarks/BookmarkIcon";

type JobListItemProps = {
  jobItem: JobItem;
  isActive: boolean;
};

export default function JobListItem({ jobItem, isActive }: JobListItemProps) {
  const { company, badgeLetters, title, daysAgo, id } = jobItem || {};
  const { handleToggleBookMark, bookmarks } = useBookmarkContext();
  return (
    <li className={`job-item ${isActive ? "job-item--active" : ""}`}>
      <a className="job-item__link" href={`#${id}`}>
        <div className="job-item__badge">{badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{title}</h3>
          <p className="job-item__company">{company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon onClick={() => handleToggleBookMark(id)} isBookmarked={bookmarks?.includes(id)} />
          <time className="job-item__time">{daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
