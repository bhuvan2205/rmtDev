import { createContext, ReactNode } from "react";
import { useActiveJobItemId } from "../lib/hooks";

type ContextProps = {
    activeJobItemId: number | null;
};

type ActiveJobItemIdProps = {
    children: ReactNode;
};

export const ActiveJobItemIdContext = createContext<ContextProps | null>(null);

const ActiveJobItemIdProvider = ({ children }: ActiveJobItemIdProps) => {

    const { activeJobItemId } = useActiveJobItemId();

    return (
        <ActiveJobItemIdContext.Provider value={{ activeJobItemId }}>{children}</ActiveJobItemIdContext.Provider>
    );
};

export default ActiveJobItemIdProvider;
