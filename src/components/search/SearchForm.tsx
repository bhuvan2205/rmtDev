import { ChangeEvent, FormEvent } from "react";
import { useSearchTextContext } from "../../lib/hooks";

export default function SearchForm() {

  const { handleSearchText, searchText } = useSearchTextContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    const input = e.target.value;
    handleSearchText(input);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };


  return (
    <form onSubmit={handleSubmit} className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      <input
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        value={searchText}
        onChange={handleChange}
      />
    </form>
  );
}
