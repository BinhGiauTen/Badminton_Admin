import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "./reviewService";

const initialState = {
  reviews: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getReviewByCourseId = createAsyncThunk(
  "review/get-review-by-course-id",
  async (courseId, thunkAPI) => {
    try {
      return await reviewService.getReviewByCourseId(courseId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviewByCourseId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviewByCourseId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.reviews = action.payload;
      })
      .addCase(getReviewByCourseId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});

export default reviewSlice.reducer;
