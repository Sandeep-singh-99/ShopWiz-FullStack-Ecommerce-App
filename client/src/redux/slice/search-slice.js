import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL =  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async ({ query, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products/search`, {
        params: { query, page, limit },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    results: [],
    page: 1,
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      state.page = 1;
      state.results = [];
      state.totalPages = 0;
    },
    resetSearch: (state) => {
      state.query = "";
      state.results = [];
      state.page = 1;
      state.totalPages = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results =
          state.page === 1
            ? action.payload.data
            : [...state.results, ...action.payload.data];
        state.totalPages = action.payload.totalPages;
        state.page += 1;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error fetching results";
      });
  },
});

export const { setQuery, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
