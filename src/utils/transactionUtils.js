export const typeSymbol = (type) => {
  return type === "INCOME" ? "+" : type === "EXPENSE" ? "-" : "";
};

export const transactionCategory = (categoryId) => {
  switch (categoryId) {
    case "cat_001":
      return "Main Expenses";
    case "cat_002":
      return "Products";
    case "cat_003":
      return "Car";
    case "cat_004":
      return "Self Care";
    case "cat_005":
      return "Child Care";
    case "cat_006":
      return "Household Products";
    case "cat_007":
      return "Education";
    case "cat_008":
      return "Leisure";
    case "cat_009":
      return "Other Expenses";
    case "cat_010":
      return "Entertainment";
    case "cat_011":
      return "Income";
    default:
      return "Other";
  }
};

export const sumColor = (type) => {
  return type === "INCOME"
    ? "rgba(255, 182, 39, 1)"
    : type === "EXPENSE"
    ? "rgba(255, 134, 141, 1)"
    : "";
};
