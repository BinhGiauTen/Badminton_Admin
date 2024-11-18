import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import coachService from "./coachService";

const initialState = {
  coaches: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const coachRegister = createAsyncThunk(
  "coach/coach-register",
  async (user, thunkAPI) => {
    try {
      return await coachService.coachRegister(user);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCoach = createAsyncThunk(
  "coach/update-coach",
  async (user,thunkAPI) => {
    try {
      return await coachService.updateCoach(user);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCoachAvatar = createAsyncThunk(
  "coach/update-coach-avatar",
  async ({id,file},thunkAPI) => {
    try {
      return await coachService.updateCoachAvatar(id,file);
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetState = createAction("Reset_all");

export const coachSlice = createSlice({
  name: "coaches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(coachRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(coachRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
      })
      .addCase(coachRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateCoach.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCoach.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
      })
      .addCase(updateCoach.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateCoachAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCoachAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
      })
      .addCase(updateCoachAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default coachSlice.reducer;
