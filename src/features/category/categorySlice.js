import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const initialState = {
  categories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllCategory = createAsyncThunk(
  "category/get-all-category",
  async (_, thunkAPI) => {
    try {
      return await categoryService.getAllCategory();
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getACategory = createAsyncThunk(
  "category/get-a-category",
  async (categoryId, thunkAPI) => {
    try {
      return await categoryService.getACategory(categoryId);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/add-category",
  async (categoryName, thunkAPI) => {
    try {
      return await categoryService.addCategory(categoryName);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update-category",
  async (categoryData, thunkAPI) => {
    try {
      return await categoryService.updateCategory(categoryData);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetState = createAction("Reset_all");

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getACategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.category = action.payload;
      })
      .addCase(getACategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addedCategory = action.payload;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default categorySlice.reducer;
