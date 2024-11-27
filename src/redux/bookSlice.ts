// src/features/books/bookSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Book {
  title: string;
  author: string;
  description: string;
  primary_isbn13: string;
  publisher: string;
  buy_links: string;
  book_image: string;
}

interface BooksState {
  books: Book[];
  selectedBook: Book | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: BooksState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    setSelectedBook: (state, action: PayloadAction<Book | null>) => {
      state.selectedBook = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setBooks, setSelectedBook, setLoading, setError } =
  bookSlice.actions;

export default bookSlice.reducer;
