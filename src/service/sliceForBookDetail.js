import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../apiService";
import { useSelector } from "react-redux";

export const postBook = createAsyncThunk("postBook", async (addingBook) => {
  await api.post(`/favorites`, addingBook);
});
export const fetchBook = createAsyncThunk("fetchBook", async (bookId) => {
  const res = await api.get(`/books/${bookId}`);
  return res.data;
});
export const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState: {
    book: [],
    addingBook: false,
    loading: false,
    errorMessage: "",
  },
  reducers: {
    addToReadingList: (state, action) => {
      console.log(action.payload);
      state.addingBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postBook.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(postBook.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "idle";
        toast.success("The book has been added to the reading list!");
        state.addingBook = false;
      })
      .addCase(postBook.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        toast.error(state.errorMessage);
      })
      .addCase(fetchBook.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.status = "idle";
        state.book = action.payload;
        state.loading = false;
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
        toast.error(state.errorMessage);
      });
  },
});
export const { addToReadingList } = bookDetailSlice.actions;
export default bookDetailSlice.reducers;
