import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  admin: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const loadUserFromSecureStore = createAsyncThunk(
  "admin/load-admin-from-localStorage",
  async (_, thunkAPI) => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      const message = error.message || "Failed to load admin";
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loadUserFromSecureStore.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loadUserFromSecureStore.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.admin = action.payload;
    })
    .addCase(loadUserFromSecureStore.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
  },
});

export default adminSlice.reducer;
