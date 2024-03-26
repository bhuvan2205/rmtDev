import Background from "./components/ui/Background";
import Container from "./components/core/Container";
import Footer from "./components/ui/Footer";
import Header from "./components/core/Header";
import { Toaster } from 'react-hot-toast';
import BookmarksProvider from "./context/BookmarksProvider";
import ActiveJobItemIdProvider from "./context/ActiveJobItemIdProvider";
import JobItemsProvider from "./context/JobItemsProvider";
import SearchTextProvider from "./context/SearchTextProvider";

function App() {

  return <>
    <Background />
    <SearchTextProvider>
      <JobItemsProvider>
        <ActiveJobItemIdProvider>
          <BookmarksProvider>
            <Header />
            <Container />
          </BookmarksProvider>
        </ActiveJobItemIdProvider>
      </JobItemsProvider>
    </SearchTextProvider>
    <Footer />
    <Toaster position="top-right" />
  </>;
}

export default App;
