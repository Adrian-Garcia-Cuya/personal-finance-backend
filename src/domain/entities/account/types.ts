export const AccountType = {
  SAVINGS: "savings",
  CASH: "cash",
  CREDIT_CARD: "creditCard",
  DEBIT_CARD: "debitCard",
  INVESTMENT: "investment",
} as const;

export type AccountType = (typeof AccountType)[keyof typeof AccountType];
