import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import adminService from "./adminService";


const initialState = {
  admin: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const adminRegister = createAsyncThunk(
  "admin/admin-register",
  async (user, thunkAPI) => {
    try {
      return await adminService.adminRegister(user);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllUser = createAsyncThunk(
  "admin/get-all-user",
  async (thunkAPI) => {
    try {
      return await adminService.getAllUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/del-a-user",
  async (id, thunkAPI) => {
    try {
      return await adminService.deleteUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(adminRegister.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(adminRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.createdUser = action.payload;
    })
    .addCase(adminRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
    .addCase(getAllUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.users = action.payload;
    })
    .addCase(getAllUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.deletedUser = action.payload;
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })

    .addCase(resetState, () => initialState);
  },
});

export default adminSlice.reducer;
