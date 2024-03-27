import { createContext, ReactNode, useCallback, useMemo, useState } from "react";
import { useJobItems, useSearchTextContext } from "../lib/hooks";
import { JobItem, PageDirectionProps, SortMethods } from "../lib/type";
import { REVIEWS_PER_PAGE } from "../constants/jobItems";

type ContextProps = {
    isLoading: boolean;
    sortedAndSlicedJobItems: JobItem[],
    handleChangePage: (direction: PageDirectionProps) => void,
    handleChangeSort: (newSortBy: SortMethods) => void,
    totalJobItems: number,
    totalPageCount: number,
    sortBy: SortMethods,
    currentPage: number;
};

type JobItemsProviderProps = {
    children: ReactNode;
};

export const JobItemsContext = createContext<ContextProps | null>(null);

const JobItemsProvider = ({ children }: JobItemsProviderProps) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<SortMethods>('relevant');

    const { debouncedSearchText } = useSearchTextContext();
    const { isLoading, data } = useJobItems(debouncedSearchText);
    const totalJobItems = data?.jobItems?.length ?? 0;
    const totalPageCount = Math.ceil(totalJobItems / REVIEWS_PER_PAGE);
    const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
    const endIndex = startIndex + REVIEWS_PER_PAGE;

    const jobItemsSliced = useMemo(() => {
        const jobItems = [...(data?.jobItems || [])];
        if (sortBy === 'recent') {
            return jobItems?.sort((a, b) => a.daysAgo - b.daysAgo);
        }
        return jobItems?.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }, [data?.jobItems, sortBy]);

    const sortedAndSlicedJobItems = useMemo(() => {
        if (sortBy === 'recent') {
            return jobItemsSliced?.slice(startIndex, endIndex);
        }
        return jobItemsSliced.slice(startIndex, endIndex);
    }, [endIndex, jobItemsSliced, sortBy, startIndex]);

    const handleChangePage = useCallback((direction: PageDirectionProps) => {

        if (direction === 'next') {
            setCurrentPage((prev) => prev + 1);
        } else if (direction === 'prev') {
            setCurrentPage((prev) => prev - 1);
        }
    }, []);

    const handleChangeSort = (newSortBy: SortMethods) => {
        setCurrentPage(1);
        setSortBy(newSortBy);
    };

    const contextValue = useMemo(() => ({ isLoading, sortedAndSlicedJobItems, handleChangePage, handleChangeSort, totalJobItems, totalPageCount, sortBy, currentPage }), [currentPage, handleChangePage, isLoading, sortBy, sortedAndSlicedJobItems, totalJobItems, totalPageCount]);

    return (
        <JobItemsContext.Provider value={contextValue}>{children}</JobItemsContext.Provider>
    );
};

export default JobItemsProvider;
