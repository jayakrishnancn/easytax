import { FORMATTED_FY } from "./../../util/calender";
import { createSlice } from "@reduxjs/toolkit";
import {
  initialDefaultState,
  saveExemptionData,
} from "../../services/exemptions";
import { ChangeExemptionFieldAction, InitializeExemptionAction } from "./type";

export const exemptionsSlice = createSlice({
  name: "exemptions",
  initialState: initialDefaultState,
  reducers: {
    resetExemptions(state, action: InitializeExemptionAction) {
      return { ...action.payload };
    },
    changeExemptionField: (state, action: ChangeExemptionFieldAction) => {
      const { field, value, year = FORMATTED_FY } = action.payload;
      const newState = {
        ...state,
        [field]: value,
      };
      saveExemptionData(newState, year);
      return newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeExemptionField, resetExemptions } =
  exemptionsSlice.actions;

export default exemptionsSlice.reducer;
