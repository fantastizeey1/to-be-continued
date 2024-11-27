import React, { useState, FormEvent } from "react";
import { useSearchBooksQuery } from "../redux/booksApi";

interface Book {
  title: string;
  author: string;
  primary_isbn13: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [listName, setListName] = useState<string>("hardcover-fiction"); // Default category

  const {
    data: searchedBooks,
    isFetching,
    error,
  } = useSearchBooksQuery({
    listName,
    searchTerm: searchTerm.trim(),
  });

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      {/* Category Selector */}
      <select
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        className="mb-5 p-2 border rounded"
      >
        <option value="hardcover-fiction">Hardcover Fiction</option>
        <option value="hardcover-nonfiction">Hardcover Nonfiction</option>
        <option value="young-adult">Young Adult</option>
        <option value="children-middle-grade">Children's Books</option>
      </select>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-5">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>

      {/* Results */}
      <h2 className="text-xl font-semibold mb-3">Search Results:</h2>
      {isFetching && <p className="text-gray-500">Searching...</p>}
      {error && (
        <p className="text-red-500">
          Error fetching results. Please try again.
        </p>
      )}
      {!isFetching && searchedBooks && searchedBooks.length === 0 && (
        <p className="text-gray-500">No results found.</p>
      )}
      <div className="grid gap-4">
        {searchedBooks &&
          searchedBooks.map((book: Book) => (
            <div
              key={book.primary_isbn13}
              className="p-4 border rounded shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="text-gray-700 italic">by {book.author}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
