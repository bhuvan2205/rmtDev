import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

type SearchFormProps = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
};

export default function SearchForm({ setSearchText, searchText }: SearchFormProps) {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    const input = e.target.value;
    setSearchText(input);
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
