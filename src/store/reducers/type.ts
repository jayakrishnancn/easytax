import { DetailedExemptionFieldsEnum } from "../../enum/detailedExemptionFields";
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

export type DetailedExemptions = {
  [key: string]: { value: number; isMonthly: boolean };
};

export type InitializeDetailedExemptionAction = {
  payload: DetailedExemptions;
  type: string;
};

export type ChangeExemptionFieldAction = {
  payload: {
    field: ExemptionFieldsEnum;
    value?: number | string | boolean;
    year?: string;
  };
  type: string;
};

export type ChangeDetailedExemptionFieldAction = {
  payload: {
    field: DetailedExemptionFieldsEnum;
    value?: number;
    year: string;
    isMonthly?: boolean;
  };
  type: string;
};
