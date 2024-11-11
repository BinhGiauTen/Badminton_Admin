import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import lessonService from "./lessonService";

const initialState = {
  freeLessons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


export const getAFreeLesson = createAsyncThunk(
  "lesson/get-a-free-lesson",
  async (freeLessonId, thunkAPI) => {
    try {
      return await lessonService.getAFreeLesson(freeLessonId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createFreeLesson = createAsyncThunk(
  "lesson/create-free-lesson",
  async (freeLessonData, thunkAPI) => {
    try {
      return await lessonService.createFreeLesson(freeLessonData);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateFreeLesson = createAsyncThunk(
  "lesson/update-free-lesson",
  async (freeLessonData, thunkAPI) => {
    try {
      return await lessonService.updateFreeLesson(freeLessonData);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteFreeLesson = createAsyncThunk(
    "lesson/delete-free-lesson",
    async (freeLessonId, thunkAPI) => {
      try {
        return await lessonService.deleteFreeLesson(freeLessonId);
      } catch (error) {
        const message = error.message || "Network Error";
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

export const resetState = createAction("Reset_all");

export const lessonSlice = createSlice({
  name: "freeLessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAFreeLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAFreeLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.freeLesson = action.payload;
      })
      .addCase(getAFreeLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateFreeLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFreeLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedFreeLesson = action.payload;
      })
      .addCase(updateFreeLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createFreeLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFreeLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdFreeLesson = action.payload;
      })
      .addCase(createFreeLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteFreeLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFreeLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedFreeLesson = action.payload;
      })
      .addCase(deleteFreeLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default lessonSlice.reducer;
