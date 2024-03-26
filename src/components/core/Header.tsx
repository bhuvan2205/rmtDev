import { Dispatch, SetStateAction } from "react";
import BookmarksButton from "../ui/BookmarksButton";
import Logo from "../ui/Logo";
import SearchForm from "../search/SearchForm";

type HeaderProps = {
  setSearchText: Dispatch<SetStateAction<string>>;
  searchText: string;
};

export default function Header({ setSearchText, searchText }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__top">
        <Logo />
        <BookmarksButton />
      </div>
      <SearchForm setSearchText={setSearchText} searchText={searchText} />
    </header>
  );
}
