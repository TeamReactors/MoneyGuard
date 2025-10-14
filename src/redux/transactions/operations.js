import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/transactions");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  }
);
