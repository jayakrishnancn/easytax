import { createSlice } from "@reduxjs/toolkit";
import { saveExemptionData, STORE_KEYS } from "../../services/exemptions";
import { getFormattedYear } from "../../util/calender";
import { getDetailedExemptionData } from "./../../services/exemptions";
import {
  ChangeDetailedExemptionFieldAction,
  InitializeDetailedExemptionAction,
} from "./type";

export const detailedExemptionsSlice = createSlice({
  name: "exemptions",
  initialState: getDetailedExemptionData(
    getFormattedYear(),
    STORE_KEYS.DetailedExemptions
  ),
  reducers: {
    resetDeailedExemptions(state, action: InitializeDetailedExemptionAction) {
      return { ...action.payload };
    },
    changeDetailedExemptionField: (
      state,
      action: ChangeDetailedExemptionFieldAction
    ) => {
      const { field } = action.payload;
      const {
        value = 0,
        isMonthly = false,
        year = getFormattedYear(),
      } = {
        ...state[field],
        ...action.payload,
      };

      const newState = {
        ...state,
        [field]: { value, isMonthly },
      };

      saveExemptionData(newState, year, STORE_KEYS.DetailedExemptions);
      return newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeDetailedExemptionField, resetDeailedExemptions } =
  detailedExemptionsSlice.actions;

export default detailedExemptionsSlice.reducer;
