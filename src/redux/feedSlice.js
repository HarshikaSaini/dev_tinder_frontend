import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFeed = createAsyncThunk(
  "feed/fetchFeed",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/feed`,
        {
          withCredentials: true,
        }
      );
      console.log(resp);
      return resp.data;
    } catch (error) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchFeed.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchFeed.fulfilled, (state,action)=>{
        state.loading = false;
        state.data = action.payload;
    })
     .addCase(fetchFeed.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
    })
  },
});

export default feedSlice.reducer
