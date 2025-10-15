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


export const transactionsSummary = createAsyncThunk(
  "transactions/transactionsSummary",
  async (date, thunkApi) => {
    try {
      const response = await axios.get(
        `https://wallet.b.goit.study/api/transactions-summary?month=${date.month}&year=${date.year}`,{ headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI1MTMwNDAyZC04ZGZiLTQ5NTktYWI2Ny0yN2E0ZjE2ODM1YTgiLCJpYXQiOjE3NjA0NzAzMzAsImV4cCI6MTAwMDAwMDE3NjA0NzAzMzB9.iuQC669u6_OOFljQxrUhN5NXfbWiNBsM5mHamYVCdzw`} }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
