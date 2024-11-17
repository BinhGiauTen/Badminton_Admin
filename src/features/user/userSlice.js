import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const loadUserFromSecureStore = createAsyncThunk(
  "user/load-user-from-localStorage",
  async (_, thunkAPI) => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      const message = error.message || "Failed to load user";
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const userSlice = createSlice({
  name: "user",
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
        state.user = action.payload;
      })
      .addCase(loadUserFromSecureStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export default userSlice.reducer;
