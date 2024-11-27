import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface BuyLink {
  name: string;
  url: string;
}

interface Book {
  title: string;
  author: string;
  description: string;
  primary_isbn13: string;
  publisher: string;
  book_image: string;
  buy_links: BuyLink[];
}

interface BooksResponse {
  results: {
    books: Book[];
  };
}
interface SearchBooksResponse {
  results: {
    books: Book[];
  };
}

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.nytimes.com/svc/books/v3/",
  }),
  endpoints: (builder) => ({
    fetchBooksByCategory: builder.query<Book[], string>({
      query: (category) =>
        `lists/current/${category}.json?api-key=Jo3rW6EC5PxFDgGF7FXCuQAS58xNAF7E`,
      transformResponse: (response: BooksResponse) => response.results.books,
    }),
    searchBooks: builder.query<
      Book[],
      { listName: string; searchTerm?: string }
    >({
      query: ({ listName, searchTerm }) => {
        let query = `lists/current/${listName}.json?api-key=Jo3rW6EC5PxFDgGF7FXCuQAS58xNAF7E`;
        if (searchTerm) {
          query += `&title=${encodeURIComponent(searchTerm)}`;
        }
        return query;
      },
      transformResponse: (response: SearchBooksResponse) =>
        response.results.books,
    }),
  }),
});

export const { useFetchBooksByCategoryQuery, useSearchBooksQuery } = booksApi;
