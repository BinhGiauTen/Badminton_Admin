import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllOrders = createAsyncThunk(
  "order/get-all-order",
  async (_, thunkAPI) => {
    try {
      return await orderService.getAllOrders();
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRevenueByMonth = createAsyncThunk(
  "order/get-revenue-by-month",
  async (_, thunkAPI) => {
    try {
      return await orderService.getRevenueByMonth();
    } catch (error) {
      const message = error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getRevenueByMonth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRevenueByMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.revenue = action.payload;
      })
      .addCase(getRevenueByMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default orderSlice.reducer;
