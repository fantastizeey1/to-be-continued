import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setSelectedBook, setError } from "../redux/bookSlice";

const BookDetails: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedBook, error } = useSelector(
    (state: RootState) => state.books
  );

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${bookId}&api-key=YOUR_API_KEY`
        );
        const data = await response.json();
        dispatch(setSelectedBook(data.results[0] || null)); // Handle no results
      } catch (err: any) {
        dispatch(setError(err.message));
      }
    };

    fetchBookDetails();
  }, [bookId, dispatch]);

  if (!selectedBook) return <div>Loading book details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{selectedBook.title}</h1>
      <p>Author: {selectedBook.author}</p>
      <p>{selectedBook.description}</p>
    </div>
  );
};

export default BookDetails;
