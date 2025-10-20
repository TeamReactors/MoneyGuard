export const typeSymbol = (type) => {
  return type === "INCOME" ? "+" : type === "EXPENSE" ? "-" : "";
};

export const transactionCategory = (categoryId) => {
  switch (categoryId) {
    case "c9d9e447-1b83-4238-8712-edc77b18b739":
      return "Main Expenses";
    case "27eb4b75-9a42-4991-a802-4aefe21ac3ce":
      return "Products";
    case "3caa7ba0-79c0-40b9-ae1f-de1af1f6e386":
      return "Car";
    case "bbdd58b8-e804-4ab9-bf4f-695da5ef64f4":
      return "Self Care";
    case "76cc875a-3b43-4eae-8fdb-f76633821a34":
      return "Child Care";
    case "128673b5-2f9a-46ae-a428-ec48cf1effa1":
      return "Household Products";
    case "1272fcc4-d59f-462d-ad33-a85a075e5581":
      return "Education";
    case "c143130f-7d1e-4011-90a4-54766d4e308e":
      return "Leisure";
    case "719626f1-9d23-4e99-84f5-289024e437a8":
      return "Other Expenses";
    case "3acd0ecd-5295-4d54-8e7c-d3908f4d0402":
      return "Entertainment";
    case "063f1132-ba5d-42b4-951d-44011ca46262":
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
