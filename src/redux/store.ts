// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";
import { booksApi } from "./booksApi";

const store = configureStore({
  reducer: {
    books: bookSlice, // Local state slice
    [booksApi.reducerPath]: booksApi.reducer, // API slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware), // Add middleware for RTK Query
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
