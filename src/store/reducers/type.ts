import { IncomeFields } from "../../type/income";
import { IncomeFieldsEnum } from "../../enum/incomeFields";

export type InitializeAction = {
  payload: IncomeFields;
  type: string;
};

export type ChangeIncomeFieldAction = {
  payload: {
    field: IncomeFieldsEnum;
    value?: number | string | boolean;
    isMonthly?: boolean;
  };
  type: string;
};
