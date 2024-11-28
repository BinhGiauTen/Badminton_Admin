import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import freeLessonService from "./freeLessonService";

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
      return await freeLessonService.getAFreeLesson(freeLessonId);
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
      return await freeLessonService.createFreeLesson(freeLessonData);
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
      return await freeLessonService.updateFreeLesson(freeLessonData);
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
      return await freeLessonService.deleteFreeLesson(freeLessonId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadImageLesson = createAsyncThunk(
  "lesson/upload-image-free-lesson",
  async (file, thunkAPI) => {
    try {
      return await freeLessonService.uploadImageLesson(file);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const freeLessonSlice = createSlice({
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
      .addCase(uploadImageLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImageLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.uploaddImageLesson = action.payload;
      })
      .addCase(uploadImageLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default freeLessonSlice.reducer;
