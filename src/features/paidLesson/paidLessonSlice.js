import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paidLessonService from "./paidLessonService";

const initialState = {
  paidLessons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


export const getAPaidLesson = createAsyncThunk(
  "paidLesson/get-a-paid-lesson",
  async (paidLessonId, thunkAPI) => {
    try {
      return await paidLessonService.getAPaidLesson(paidLessonId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createPaidLesson = createAsyncThunk(
  "paidLesson/create-paid-lesson",
  async (paidLessonData, thunkAPI) => {
    try {
      return await paidLessonService.createPaidLesson(paidLessonData);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePaidLesson = createAsyncThunk(
  "paidLesson/update-paid-lesson",
  async (paidLessonData, thunkAPI) => {
    try {
      return await paidLessonService.updatePaidLesson(paidLessonData);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePaidLesson = createAsyncThunk(
    "paidLesson/delete-paid-lesson",
    async (paidLessonId, thunkAPI) => {
      try {
        return await paidLessonService.deletePaidLesson(paidLessonId);
      } catch (error) {
        const message = error.message || "Network Error";
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

export const paidLessonSlice = createSlice({
  name: "paidLessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAPaidLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAPaidLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.paidLesson = action.payload;
      })
      .addCase(getAPaidLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updatePaidLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePaidLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedPaidLesson = action.payload;
      })
      .addCase(updatePaidLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createPaidLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPaidLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdPaidLesson = action.payload;
      })
      .addCase(createPaidLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deletePaidLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePaidLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedPaidLesson = action.payload;
      })
      .addCase(deletePaidLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});

export default paidLessonSlice.reducer;
