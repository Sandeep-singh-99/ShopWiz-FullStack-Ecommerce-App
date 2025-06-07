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

export const getTotalOrder = createAsyncThunk("order/getTotalOrder", async (_, thunkApi) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/order/total-orders`, {
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data || "Unknown error");
  }
})

export const totalOrder = createAsyncThunk("order/totalOrder", async (_, thunkApi) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/order/overAllOrders`, {
      withCredentials: true,
    });
    
    return response.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data || "Unknown error");
  }
});

export const totalAmount = createAsyncThunk("order/totalOrderAmount", async (_, thunkApi) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/order/total-amount`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data || "Unknown error");
  }
});


export const getTopSellingProducts = createAsyncThunk('order/getTopSellingProducts', async (_, thunkApi) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/order/top-selling-products`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data || "Unknown error");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    totalOrders: 0,
    totalOrderAllUsers: 0,
    totalOrderAmount: 0,
    topSellingProducts: [],
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
      })

      .addCase(getTotalOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getTotalOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.totalOrders = action.payload.data;
      })

      .addCase(getTotalOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(totalOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(totalOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.totalOrderAllUsers = action.payload;
      })
      .addCase(totalOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(totalAmount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(totalAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.totalOrderAmount = action.payload;
      })
      .addCase(totalAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getTopSellingProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopSellingProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.topSellingProducts = action.payload;
      })
      .addCase(getTopSellingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default orderSlice.reducer;
