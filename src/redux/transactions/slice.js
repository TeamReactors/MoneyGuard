import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactions } from "./operations";
import { logOut } from "../auth/operations";
import { transactionsSummary } from "./operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
  transactionsSummary: {
    "categoriesSummary": [],
    "incomeSummary": 0,
    "expenseSummary": 0,
    "periodTotal": 0,
    "year": null,
    "month": null
},
  date: {month:1,year:2020},
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, handlePending)
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, handleRejected)
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      })

      .addCase(transactionsSummary.pending, handlePending)
      .addCase(transactionsSummary.fulfilled, (state, action) => {
        state.transactionsSummary = action.payload;
      })
      .addCase(transactionsSummary.rejected, handleRejected);
  },
  reducers: {
    changeDate: (state, action) => {
      state.date = action.payload;
    },
  },

});

export default transactionsSlice.reducer;
export const { changeDate } = transactionsSlice.actions;