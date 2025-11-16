import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFeed = createAsyncThunk(
  "feed/fetchFeed",
  async (page, { rejectWithValue }) => {
    try {
      const resp = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/feed?page=${page}&limit=20`,
        { withCredentials: true }
      );
      return resp.data.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.mess || error.message,
        status: error.response?.status,
      });
    }
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    data: [],
    loading: false,
    error: null,
    hasMore:true
  },
  reducers: {
    removeFeed: (state, action) => {
      state.data = state.data.filter((item) => item._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.hasMore = true;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        if(action.meta.arg === 1){
          state.data = action.payload;
        }else{
          state.data = [...state.data, ...action.payload]
        }
        state.hasMore = action.payload.length === 20
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.hasMore = false;
      });
  },
});

export const { removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
