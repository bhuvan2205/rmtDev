import { createContext, ReactNode } from "react";
import { useGetBookmarkJobItems, useLocalStorage } from "../lib/hooks";
import { ActiveJobItem } from "../lib/type";

type ContextProps = {
    bookmarks: number[];
    handleToggleBookMark: (id: number) => void;
    bookmarkedJobItems: ActiveJobItem[];
    isLoading: boolean;
};

type BookmarksProviderProps = {
    children: ReactNode;
};

export const BookmarksContext = createContext<ContextProps | null>(null);

const BookmarksProvider = ({ children }: BookmarksProviderProps) => {

    const [bookmarks, setBookMarks] = useLocalStorage<number[]>("bookmarks", []);
    const { jobItems: bookmarkedJobItems, isLoading } = useGetBookmarkJobItems(bookmarks);

    const handleToggleBookMark = (id: number) => {
        if (bookmarks?.includes(id)) {
            setBookMarks(prev => prev.filter(bookmark => bookmark !== id));
            return;
        }
        setBookMarks(prev => [...prev, id]);
    };

    return (
        <BookmarksContext.Provider value={{ bookmarks, handleToggleBookMark, bookmarkedJobItems, isLoading }}>{children}</BookmarksContext.Provider>
    );
};

export default BookmarksProvider;
