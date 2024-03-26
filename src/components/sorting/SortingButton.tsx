import { ReactNode } from "react";

type SortingButtonsProps = {
    children: ReactNode;
    className: string;
    onClick: () => void;
};

export default function SortingButtons({ children, className, onClick }: SortingButtonsProps) {
    return <button className={className} onClick={onClick}>
        {children}
    </button>;
}