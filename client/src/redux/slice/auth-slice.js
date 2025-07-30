import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.withCredentials = true;

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/logout`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data || "Logout failed");
  }
});


// Check Auth with Optimized Logic
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkApi) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/check-auth`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data || "Authentication failed");
  }
});


export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (data, thunkApi) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/admin-login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("adminToken", response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const totalUser = createAsyncThunk('auth/totalUsers', async (_, thunkApi) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/total-users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const getAllUsers = createAsyncThunk('auth/getAllUsers', async (_, thunkApi) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/get-all-users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

const initialState = {
  isLoading: false,
  isAuthenticated: false, 
  error: null,
  user: null,
  totalUsers: 0,
  allUsers: []
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(totalUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(totalUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalUsers = action.payload || 0;
      })
      .addCase(totalUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload || [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;