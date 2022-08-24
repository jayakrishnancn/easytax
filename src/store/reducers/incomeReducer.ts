import { createSlice } from "@reduxjs/toolkit";
import { initialDefaultState, saveIncomeData } from "../../services/income";
import { ChangeIncomeFieldAction, InitializeIncomeAction } from "./type";

export const incomeSlice = createSlice({
  name: "income",
  initialState: initialDefaultState,
  reducers: {
    resetIncome(state, action: InitializeIncomeAction) {
      return { ...action.payload };
    },
    changeIncomeField: (state, action: ChangeIncomeFieldAction) => {
      const {
        field,
        value = state[field].value,
        isMonthly = state[field].isMonthly,
      } = action.payload;
      const newState = {
        ...state,
        [field]: { ...state[field], value, isMonthly },
      };
      saveIncomeData(newState);
      return newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeIncomeField, resetIncome } = incomeSlice.actions;

export default incomeSlice.reducer;
