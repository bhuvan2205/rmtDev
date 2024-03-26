import toast from "react-hot-toast";
import { API_BASE_URL } from "../constants/endpoints";
import { ActiveJobItem, JobItem } from "./type";

type ActiveJobItemApiResponse = { public: boolean, jobItem: ActiveJobItem; } | null;
type JobItemsApiResponse = { public: boolean, jobItems: JobItem[]; } | null;

export const fetchJobItem = async (id: number): Promise<ActiveJobItemApiResponse> => {
    const res = await fetch(`${API_BASE_URL}/${id}`);
    if (!res.ok) {
        throw new Error('Something went wrong!');
    }
    const data = await res.json();
    return data;
};

export const fetchJobItemList = async (searchText: string): Promise<JobItemsApiResponse> => {
    const res = await fetch(`${API_BASE_URL}?search=${searchText}`);
    if (!res.ok) {
        throw new Error('Something went wrong!');
    }
    const data = await res.json();    return data;
};

export const handleErrors = (err: Error) => {
    let message;
    if (err instanceof Error) {
        message = err?.message;
    } else {
        message = "An error occurs!";
    }
    toast.error(message);
};