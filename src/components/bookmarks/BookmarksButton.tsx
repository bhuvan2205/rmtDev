import { TriangleDownIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import BookmarksPopover from "./BookmarksPopover";
import { useOnClickOutside } from "../../lib/hooks";

export default function BookmarksButton() {
  const [showPopup, setShowPopup] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const toggleShowPopup = () => setShowPopup(prev => !prev);
  useOnClickOutside([buttonRef, popoverRef], () => setShowPopup(false));

  return (
    <section>
      <button ref={buttonRef} className="bookmarks-btn" onClick={toggleShowPopup}>
        Bookmarks <TriangleDownIcon />
      </button>
      {showPopup && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
