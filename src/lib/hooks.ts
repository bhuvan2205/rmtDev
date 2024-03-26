import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchJobItem, fetchJobItemList, handleErrors } from "./utils";
import { STALE_TIME } from "../constants/query";

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

export const useGetActiveJobItem = () => {
    const { activeJobItemId } = useActiveJobItemId();
    const { data, isInitialLoading } = useQuery(['job-item', activeJobItemId], async () => fetchJobItem(activeJobItemId as number), {
        retry: 1,
        staleTime: STALE_TIME,
        refetchOnWindowFocus: false,
        enabled: !!activeJobItemId,
        onError: handleErrors
    });
    const { jobItem } = data || {};
    return { jobItem, isLoading: isInitialLoading };
};
