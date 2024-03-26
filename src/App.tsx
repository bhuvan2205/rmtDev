import { useMemo, useState } from "react";
import Background from "./components/ui/Background";
import Container from "./components/core/Container";
import Footer from "./components/ui/Footer";
import Header from "./components/core/Header";
import { useDebounce, useJobItems } from "./lib/hooks";
import { Toaster } from 'react-hot-toast';
import { PageDirectionProps, SortMethods } from "./lib/type";
import { REVIEWS_PER_PAGE } from "./constants/jobItems";
import BookmarksProvider from "./context/BookmarksProvider";
import ActiveJobItemIdProvider from "./context/ActiveJobItemIdProvider";

function App() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortMethods>('relevant');

  const { isLoading, data } = useJobItems(debouncedSearchText);
  const totalJobItems = data?.jobItems?.length ?? 0;
  const totalPageCount = Math.ceil(totalJobItems / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;

  const jobItems = useMemo(() => {
    if (sortBy === 'recent') {
      return data?.jobItems?.sort((a, b) => a.daysAgo - b.daysAgo)?.slice(startIndex, endIndex) ?? [];
    }
    return data?.jobItems?.sort((a, b) => b.relevanceScore - a.relevanceScore)?.slice(startIndex, endIndex) ?? [];
  }, [data?.jobItems, endIndex, sortBy, startIndex]);

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

  return <>
    <Background />
    <ActiveJobItemIdProvider>
      <BookmarksProvider>
        <Header setSearchText={setSearchText} searchText={searchText} />
        <Container jobItemResults={totalJobItems} jobItems={jobItems} isLoading={isLoading} onChangePage={handleChangePage} totalPageCount={totalPageCount} currentPage={currentPage} handleChangeSort={handleChangeSort} sortBy={sortBy} />
      </BookmarksProvider>
    </ActiveJobItemIdProvider>
    <Footer />
    <Toaster position="top-right" />
  </>;
}

export default App;
