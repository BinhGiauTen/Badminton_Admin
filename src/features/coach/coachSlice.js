import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import coachService from "./coachService";

const initialState = {
  coaches: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllCoach = createAsyncThunk(
  "coach/get-all-coach",
  async (thunkAPI) => {
    try {
      return await coachService.getAllCoach();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCoach = createAsyncThunk(
  "coach/del-a-coach",
  async (id, thunkAPI) => {
    try {
      return await coachService.deleteCoach(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
      .addCase(getAllCoach.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCoach.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coaches = action.payload;
      })
      .addCase(getAllCoach.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCoach.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoach.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCoach = action.payload;
      })
      .addCase(deleteCoach.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default coachSlice.reducer;
