import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ----------------------
// 1 Create Async Thunks
// ----------------------

// Fetch all connections
export const fetchConnections = createAsyncThunk(
  "connection/fetchConnections",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/connection`, {
        withCredentials: true,
      });
      return res.data.data; // this becomes action.payload in fulfilled
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// ----------------------
// 2 Slice Definition
// ----------------------

const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    data: [],         //  array of connections
    loading: false,   //  track loading
    error: null,      //  track errors
  },
  reducers: {
    setConnection: (state, action) => {
      state.data = action.payload;
    },
    addConnection: (state, action) => {
      state.data.push(action.payload);
    },
    removeConnection: (state, action) => {
      state.data = state.data.filter((conn) => conn._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchConnections lifecycle
      .addCase(fetchConnections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConnections.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchConnections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { setConnection, addConnection, removeConnection } =
  connectionSlice.actions;

export default connectionSlice.reducer;