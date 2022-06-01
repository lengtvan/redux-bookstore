import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../apiService";

export const fetchBooks = createAsyncThunk("fetchBooks", async (url) => {
  const res = await api.get(url);
  return res.data;
});

export const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    pageNum: 1,
    loading: false,
    query: "",
    errorMessage: "",
    limit: 10,
    totalPage: 10,
  },
  reducers: {
    HandleClickBook: (state, action) => {
      console.log("huhu");
      // const navigate = useNavigate();
      // navigate(`/books/${action.payload}`);
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        const newBooks = [];
        action.payload.forEach((book) => {
          newBooks.push(book);
        });
        state.books = newBooks;
        state.status = "idle";
        state.loading = false;
      });
  },
});
export const { setQuery, setPageNum, HandleClickBook } = bookSlice.actions;
export default bookSlice.reducers;
