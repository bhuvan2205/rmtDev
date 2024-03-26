import { createContext, ReactNode, useState } from "react";
import { useDebounce } from "../lib/hooks";

type ContextProps = {
    debouncedSearchText: string,
    searchText: string,
    handleSearchText: (text: string) => void;
};

type SearchTextProviderProps = {
    children: ReactNode;
};

export const SearchTextContext = createContext<ContextProps | null>(null);

const SearchTextProvider = ({ children }: SearchTextProviderProps) => {
    const [searchText, setSearchText] = useState('');
    const debouncedSearchText = useDebounce(searchText);

    const handleSearchText = (text: string) => {
        setSearchText(text);
    };


    return (
        <SearchTextContext.Provider value={{ debouncedSearchText, searchText, handleSearchText }}>{children}</SearchTextContext.Provider>
    );
};

export default SearchTextProvider;
