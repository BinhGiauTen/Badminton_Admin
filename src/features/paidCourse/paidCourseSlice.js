import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import paidCourseService from "./paidCourseService";

const initialState = {
  paidCourses: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllPaidCourse = createAsyncThunk(
  "paidCourse/get-all-paid-course",
  async (_, thunkAPI) => {
    try {
      return await paidCourseService.getAllPaidCourse();
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAPaidCourse = createAsyncThunk(
  "paidCourse/get-a-paid-course",
  async (paidCourseId, thunkAPI) => {
    try {
      return await paidCourseService.getAPaidCourse(paidCourseId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPaidCourseByCategoryId = createAsyncThunk(
    "paidCourse/get-paid-course-by-category",
    async (categoryId, thunkAPI) => {
      try {
        return await paidCourseService.getPaidCourseByCategoryId(categoryId);
      } catch (error) {
        const message = error.message || "Network Error";
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

export const createPaidCourse = createAsyncThunk(
  "paidCourse/create-paid-course",
  async (paidCourseData, thunkAPI) => {
    try {
      return await paidCourseService.createPaidCourse(paidCourseData);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePaidCourse = createAsyncThunk(
  "paidCourse/update-paid-course",
  async (paidCourseData, thunkAPI) => {
    try {
      return await paidCourseService.updatePaidCourse(paidCourseData);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePaidCourseThumbnail = createAsyncThunk(
    "paidCourse/update-paid-course-thumbnail",
    async ({paidCourseId, file}, thunkAPI) => {
      try {
        return await paidCourseService.updatePaidCourseThumbnail(paidCourseId, file);
      } catch (error) {
        const message = error.message || "Network Error";
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

export const deletePaidCourse = createAsyncThunk(
  "paidCourse/delete-paid-course",
  async ({paidCourseId, coachId}, thunkAPI) => {
    try {
      return await paidCourseService.deletePaidCourse(paidCourseId, coachId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetState = createAction("Reset_all");

export const paidCourseSlice = createSlice({
  name: "paidCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPaidCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPaidCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.paidCourses = action.payload;
      })
      .addCase(getAllPaidCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAPaidCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAPaidCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.paidCourse = action.payload;
      })
      .addCase(getAPaidCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getPaidCourseByCategoryId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaidCourseByCategoryId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.paidCourses = action.payload;
      })
      .addCase(getPaidCourseByCategoryId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updatePaidCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePaidCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedPaidCourse = action.payload;
      })
      .addCase(updatePaidCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updatePaidCourseThumbnail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePaidCourseThumbnail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedPaidCourse = action.payload;
      })
      .addCase(updatePaidCourseThumbnail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createPaidCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPaidCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdPaidCourse = action.payload;
      })
      .addCase(createPaidCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deletePaidCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePaidCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedPaidCourse = action.payload;
      })
      .addCase(deletePaidCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default paidCourseSlice.reducer;
