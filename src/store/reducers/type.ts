import { IncomeFieldsEnum } from "../../enum/incomeFields";
import { initialDefaultState } from "../../services/exemptions";
import { IncomeFields } from "../../type/income";
import { ExemptionFieldsEnum } from "./../../enum/exemptionFields";

export type InitializeIncomeAction = {
  payload: IncomeFields;
  type: string;
};

export type ChangeIncomeFieldAction = {
  payload: {
    field: IncomeFieldsEnum;
    value?: number | string | boolean;
    isMonthly?: boolean;
    year?: string;
  };
  type: string;
};
export type ExemptionsType = typeof initialDefaultState;

export type InitializeExemptionAction = {
  payload: ExemptionsType;
  type: string;
};

export type ChangeExemptionFieldAction = {
  payload: {
    field: ExemptionFieldsEnum;
    value?: number | string | boolean;
  };
  type: string;
};
