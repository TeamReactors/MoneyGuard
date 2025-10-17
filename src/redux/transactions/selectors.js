export const selectTransactions = (state) => state.transactions.items;
export const selectLoading = (state) => state.transactions.loading;
export const selectError = (state) => state.transactions.error;

/* Balance selector (Saliha) */
export const selectBalance = (state) => {
  return state.transactionsSummary.periodTotal;
};
