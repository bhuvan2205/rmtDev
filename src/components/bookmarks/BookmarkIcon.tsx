import { BookmarkFilledIcon } from "@radix-ui/react-icons";

type BookmarkIconProps = {
  onClick: () => void;
  isBookmarked: boolean;
};

export default function BookmarkIcon({ onClick, isBookmarked }: BookmarkIconProps) {
  return (
    <button className="bookmark-btn" onClick={(e) => {
      onClick();
      e.stopPropagation();
      e.preventDefault();
    }}>
      <BookmarkFilledIcon className={`${isBookmarked ? 'filled' : ''}`} />
    </button>
  );
}
