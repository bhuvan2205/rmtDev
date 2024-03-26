import { forwardRef } from "react";
import { useBookmarkContext } from "../../lib/hooks";
import JobList from "../jobItems/JobList";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobItems, isLoading = false } = useBookmarkContext();

  return createPortal(<div ref={ref} className="bookmarks-popover">
    <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
  </div>, document?.body);
});

export default BookmarksPopover;