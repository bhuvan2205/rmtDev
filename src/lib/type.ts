export type JobItem = {
    id: number;
    title: string;
    badgeLetters: string;
    company: string;
    daysAgo: number;
    relevanceScore: number;
};

export type ActiveJobItem = JobItem & {
    description: string;
    qualifications: string[];
    reviews: string[];
    duration: string;
    salary: string;
    location: string;
    coverImgURL: string;
    companyURL: string;
};

export type PageDirectionProps = "next" | "prev";
export type SortMethods = "relevant" | "recent";