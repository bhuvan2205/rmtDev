import BookmarksButton from "../bookmarks/BookmarksButton";
import Logo from "../ui/Logo";
import SearchForm from "../search/SearchForm";


export default function Header() {
  return (
    <header className="header">
      <div className="header__top">
        <Logo />
        <BookmarksButton />
      </div>
      <SearchForm />
    </header>
  );
}
