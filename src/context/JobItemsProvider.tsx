import { createContext, ReactNode, useMemo, useState } from "react";
import { useJobItems, useSearchTextContext } from "../lib/hooks";
import { JobItem, PageDirectionProps, SortMethods } from "../lib/type";
import { REVIEWS_PER_PAGE } from "../constants/jobItems";

type ContextProps = {
    isLoading: boolean;
    sortedAndSlicedJobItems: JobItem[],
    jobItems: JobItem[],
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
        if (sortBy === 'recent') {
            return data?.jobItems?.sort((a, b) => a.daysAgo - b.daysAgo) ?? [];
        }
        return data?.jobItems?.sort((a, b) => b.relevanceScore - a.relevanceScore) ?? [];
    }, [data?.jobItems, sortBy]);

    const sortedAndSlicedJobItems = useMemo(() => {
        if (sortBy === 'recent') {
            return jobItemsSliced?.slice(startIndex, endIndex);
        }
        return jobItemsSliced.slice(startIndex, endIndex);
    }, [endIndex, jobItemsSliced, sortBy, startIndex]);

    const handleChangePage = (direction: PageDirectionProps) => {

        if (direction === 'next') {
            setCurrentPage((prev) => {
                if (prev === totalPageCount) {
                    return prev;
                }
                return prev + 1;
            });
        } else if (direction === 'prev') {
            setCurrentPage((prev) => {
                if (prev === 1) {
                    return 1;
                }
                return prev - 1;
            });
        }
    };

    const handleChangeSort = (newSortBy: SortMethods) => {
        setCurrentPage(1);
        setSortBy(newSortBy);
    };

    return (
        <JobItemsContext.Provider value={{ jobItems: data?.jobItems ?? [], isLoading, sortedAndSlicedJobItems, handleChangePage, handleChangeSort, totalJobItems, totalPageCount, sortBy, currentPage }}>{children}</JobItemsContext.Provider>
    );
};

export default JobItemsProvider;
