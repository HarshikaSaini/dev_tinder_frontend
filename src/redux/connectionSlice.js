import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ----------------------
// 🔹 1️⃣ Create Async Thunks
// ----------------------

// Fetch all connections
export const fetchConnections = createAsyncThunk(
  "connection/fetchConnections",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/connections`, {
        withCredentials: true,
      });
      return res.data.data; // ✅ this becomes action.payload in fulfilled
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add a new connection
export const createConnection = createAsyncThunk(
  "connection/createConnection",
  async (newConnection, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/connections`,
        newConnection,
        { withCredentials: true }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ----------------------
// 🔹 2️⃣ Slice Definition
// ----------------------

const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    data: [],         // ✅ array of connections
    loading: false,   // ✅ track loading
    error: null,      // ✅ track errors
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
      // 🟢 fetchConnections lifecycle
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

      // 🟢 createConnection lifecycle
      .addCase(createConnection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConnection.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createConnection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setConnection, addConnection, removeConnection } =
  connectionSlice.actions;

export default connectionSlice.reducer;