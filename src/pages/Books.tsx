import React, { ChangeEvent, useState } from "react";
import { useFetchBooksByCategoryQuery } from "../redux/booksApi";
import NotFound from "./NotFound";

const Books: React.FC = () => {
  const [category, setCategory] = useState<string>("hardcover-fiction"); // Default category
  const { data, error, isLoading } = useFetchBooksByCategoryQuery(category);

  // Handle category change
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  // Loading state
  if (isLoading) return <div className="text-center text-xl">Loading...</div>;

  // Error handling
  if (error) {
    console.error("Error fetching books:", error);
    return <NotFound />; // Render NotFound component on error
  }

  // Render the list of books
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">Books List</h1>

      {/* Category Selector */}
      <label htmlFor="category-select" className="block mb-2 font-medium">
        Select a Category:
      </label>
      <select
        id="category-select"
        onChange={handleCategoryChange}
        className="mb-5 p-2 border rounded"
        aria-label="Select a book category"
      >
        <option value="hardcover-fiction">Hardcover Fiction</option>
        <option value="paperback-nonfiction">Paperback Nonfiction</option>
        <option value="young-adult">Young Adult</option>
      </select>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((book) => (
            <div
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
              key={book.primary_isbn13}
            >
              <img
                src={book.book_image}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="italic text-gray-600">by {book.author}</p>
              <p className="mt-2 text-sm text-gray-700">
                <strong>Description:</strong> {book.description}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Publisher:</strong> {book.publisher}
              </p>
              <p className="text-sm text-gray-700">
                <strong>ISBN:</strong> {book.primary_isbn13}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {book.buy_links.slice(0, 2).map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-sm"
                  >
                    Buy on {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No books found.</p>
      )}
    </div>
  );
};

export default Books;
