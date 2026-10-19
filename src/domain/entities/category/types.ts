export const CategoryType = {
  INCOME: "income",
  EXPENSE: "expense",
} as const;

export type CategoryType = (typeof CategoryType)[keyof typeof CategoryType];
