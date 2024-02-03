import { createSlice } from "@reduxjs/toolkit";
import { getIncomeData, saveIncomeData } from "../../services/income";
import { getFormattedYear } from "../../util/calender";
import { ChangeIncomeFieldAction, InitializeIncomeAction } from "./type";

export const incomeSlice = createSlice({
  name: "income",
  initialState: getIncomeData(getFormattedYear()),
  reducers: {
    resetIncome(state, action: InitializeIncomeAction) {
      return { ...action.payload };
    },
    changeIncomeField: (state, action: ChangeIncomeFieldAction) => {
      const {
        field,
        value = state[field].value,
        isMonthly = state[field]?.isMonthly,
        year = getFormattedYear(),
      } = action.payload;
      const newState = {
        ...state,
        [field]: { ...state[field], value, isMonthly },
      };
      saveIncomeData(newState, year);
      return newState;
    },
    clearIncomeData(){
      return getIncomeData(getFormattedYear())
    }
  },
});

// Action creators are generated for each case reducer function
export const { changeIncomeField, resetIncome, clearIncomeData } = incomeSlice.actions;

export default incomeSlice.reducer;
