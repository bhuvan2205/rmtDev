import { Dispatch, RefObject, SetStateAction, useContext, useEffect, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchJobItem, fetchJobItemList, handleErrors } from "./utils";
import { STALE_TIME } from "../constants/query";
import { BookmarksContext } from "../context/BookmarksProvider";
import { ActiveJobItemIdContext } from "../context/ActiveJobItemIdProvider";
import { SearchTextContext } from "../context/SearchTextProvider";
import { JobItemsContext } from "../context/JobItemsProvider";

export const useJobItems = (searchText: string) => {
    const { data, isInitialLoading } = useQuery(['job-list', searchText], () => fetchJobItemList(searchText), {
        retry: 1,
        refetchInterval: false,
        enabled: !!searchText,
        staleTime: STALE_TIME,
        onError: handleErrors
    });
    return { isLoading: isInitialLoading, data };
};

export const useActiveJobItemId = () => {
    const [activeJobItem, setActiveJobItem] = useState<number | null>(null);

    useEffect(() => {

        const handleHashChange = () => {
            const id = window?.location?.hash.slice(1);
            setActiveJobItem(+id);
        };

        handleHashChange();
        window?.addEventListener('hashchange', handleHashChange);

        return () => {
            window?.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return { activeJobItemId: activeJobItem };
};

export const useGetActiveJobItem = (activeJobItemId: number | null) => {
    const { data, isInitialLoading } = useQuery(['job-item', activeJobItemId], () => fetchJobItem(activeJobItemId as number), {
        retry: 1,
        staleTime: STALE_TIME,
        refetchOnWindowFocus: false,
        enabled: !!activeJobItemId,
        onError: handleErrors
    });
    const { jobItem } = data || {};
    return { jobItem, isLoading: isInitialLoading };
};

export const useGetBookmarkJobItems = (ids: number[]) => {
    const results = useQueries({
        queries: ids.map(id => ({
            queryKey: ['job-item', id],
            queryFn: () => fetchJobItem(id as number),
            retry: false,
            staleTime: STALE_TIME,
            refetchOnWindowFocus: false,
            enabled: !!id,
            onError: handleErrors
        }))
    });

    const jobItems = results.map(result => result?.data?.jobItem).filter(jobItem => !!jobItem);
    const isLoading = results.some(result => result?.isLoading);
    return { jobItems, isLoading };
};

export const useDebounce = <T,>(value: T): T => {

    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        if (!value) return;
        const timeout = setTimeout(() => {
            setDebounceValue(value);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };

    }, [value]);

    return debounceValue;
};

export const useLocalStorage = <T,>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
    const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue)));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
};

export const useBookmarkContext = () => {
    const context = useContext(BookmarksContext);
    if (!context) {
        throw new Error('Provider should be placed inside the Wrapper!');
    }
    return context;
};

export const useActiveJobItemContext = () => {
    const context = useContext(ActiveJobItemIdContext);
    if (!context) {
        throw new Error('Provider should be placed inside the Wrapper!');
    }
    return context;
};

export const useSearchTextContext = () => {
    const context = useContext(SearchTextContext);
    if (!context) {
        throw new Error('Provider should be placed inside the Wrapper!');
    }
    return context;
};

export const useJobItemsContext = () => {
    const context = useContext(JobItemsContext);
    if (!context) {
        throw new Error('Provider should be placed inside the Wrapper!');
    }
    return context;
};

export const useOnClickOutside = (refs: RefObject<HTMLElement>[], cb: () => void) => {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && refs.every(ref => !ref.current?.contains(e.target as Node))) {
                cb();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };

    }, [cb, refs]);
};