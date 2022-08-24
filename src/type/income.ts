import { IncomeFieldsEnum } from "../enum/incomeFields";

export type Income = {
  value: number | string | boolean;
  isMonthly: boolean;
};

export type IncomeFields = {
  [key in IncomeFieldsEnum]: Income;
};
