import { IncomeFields } from "../type/income";

export const calculateTotalIncome = (fields: IncomeFields) => {
  return Object.values(fields).reduce((acc, income) => {
    const freq = income.isMonthly ? 12 : 1;
    return acc + (Number(income.value) || 0) * freq;
  }, 0);
};
