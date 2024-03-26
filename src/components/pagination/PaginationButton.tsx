import { ReactNode } from "react";

type PaginationButtonProps = {
    onClick: () => void;
    isDisabled: boolean;
    children: ReactNode;
    className: string;
};

export default function PaginationButton({ onClick, isDisabled, children, className }: PaginationButtonProps) {
    return <button disabled={isDisabled} className={className} onClick={onClick}>
        {children}
    </button>;
}