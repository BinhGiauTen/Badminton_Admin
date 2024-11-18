import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import freeCourseService from "./freeCourseService";

const initialState = {
  freeCourses: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllFreeCourse = createAsyncThunk(
  "freeCourse/get-all-free-course",
  async (_, thunkAPI) => {
    try {
      return await freeCourseService.getAllFreeCourse();
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getFreeCourseByCategoryId = createAsyncThunk(
  "freeCourse/get-free-course-by-category",
  async (categoryId, thunkAPI) => {
    try {
      return await freeCourseService.getFreeCourseByCategoryId(categoryId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAFreeCourse = createAsyncThunk(
  "freeCourse/get-a-free-course",
  async (freeCourseId, thunkAPI) => {
    try {
      return await freeCourseService.getAFreeCourse(freeCourseId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createFreeCourse = createAsyncThunk(
  "freeCourse/create-free-course",
  async (freeCourseData, thunkAPI) => {
    try {
      return await freeCourseService.createFreeCourse(freeCourseData);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateFreeCourse = createAsyncThunk(
  "freeCourse/update-free-course",
  async (freeCourseData, thunkAPI) => {
    try {
      return await freeCourseService.updateFreeCourse(freeCourseData);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateFreeCourseThumbnail = createAsyncThunk(
  "freeCourse/update-free-course-thumbnail",
  async ({freeCourseId, file}, thunkAPI) => {
    try {
      return await freeCourseService.updateFreeCourseThumbnail(freeCourseId, file);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteFreeCourse = createAsyncThunk(
  "freeCourse/delete-free-course",
  async (freeCourseId, thunkAPI) => {
    try {
      return await freeCourseService.deleteFreeCourse(freeCourseId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetState = createAction("Reset_all");

export const freeCourseSlice = createSlice({
  name: "freeCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFreeCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFreeCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.freeCourses = action.payload;
      })
      .addCase(getAllFreeCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getFreeCourseByCategoryId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFreeCourseByCategoryId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.freeCourses = action.payload;
      })
      .addCase(getFreeCourseByCategoryId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAFreeCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAFreeCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.freeCourse = action.payload;
      })
      .addCase(getAFreeCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateFreeCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFreeCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedFreeCourse = action.payload;
      })
      .addCase(updateFreeCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateFreeCourseThumbnail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFreeCourseThumbnail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedFreeCourse = action.payload;
      })
      .addCase(updateFreeCourseThumbnail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createFreeCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFreeCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdFreeCourse = action.payload;
      })
      .addCase(createFreeCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteFreeCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFreeCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedFreeCourse = action.payload;
      })
      .addCase(deleteFreeCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default freeCourseSlice.reducer;
