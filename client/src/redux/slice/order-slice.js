import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (_, thunkApi) => {
    try {
      const resonse = await axios.get(
        `${API_BASE_URL}/api/order/getAllOrders`,
        { withCredentials: true }
      );
      return resonse.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default orderSlice.reducer;
