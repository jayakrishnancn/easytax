import { IncomeFieldsEnum } from "../../enum/incomeFields";
import { createSlice } from "@reduxjs/toolkit";
import { IncomeFields } from "../../components/type/income";

type ChangeIncomeFieldAction = {
  payload: {
    field: IncomeFieldsEnum;
    value?: number | string | boolean;
    isMonthly?: boolean;
  };
  type: string;
};

const initialState: IncomeFields = {
  [IncomeFieldsEnum.salary_basicDA]: { value: 0, isMonthly: false },
  [IncomeFieldsEnum.salary_HRA]: { value: 0, isMonthly: false },
  [IncomeFieldsEnum.salary_bonus]: { value: 0, isMonthly: false },
  [IncomeFieldsEnum.salary_other]: { value: 0, isMonthly: false },
  [IncomeFieldsEnum.businessAndProfession]: { value: 0, isMonthly: false },
  [IncomeFieldsEnum.CapitalGains]: { value: 0, isMonthly: false },
  [IncomeFieldsEnum.other]: { value: 0, isMonthly: false },
};

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    changeIncomeField: (state, action: ChangeIncomeFieldAction) => {
      const {
        field,
        value = state[field].value,
        isMonthly = state[field].isMonthly,
      } = action.payload;
      return { ...state, [field]: { ...state[field], value, isMonthly } };
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeIncomeField } = incomeSlice.actions;

export default incomeSlice.reducer;
