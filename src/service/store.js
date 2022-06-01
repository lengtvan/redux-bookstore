import { configureStore } from "@reduxjs/toolkit";
import { bookDetailSlice } from "./sliceForBookDetail";
import { bookSlice } from "./sliceForBooks";

const store = configureStore({
  reducer: {
    books: bookSlice.reducer,
    bookDetail: bookDetailSlice.reducer,
  },
});

export default store;
