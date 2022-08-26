import { createSlice } from "@reduxjs/toolkit";
import { getExemptionData, saveExemptionData } from "../../services/exemptions";
import { FORMATTED_FY } from "./../../util/calender";
import { ChangeExemptionFieldAction, InitializeExemptionAction } from "./type";

export const exemptionsSlice = createSlice({
  name: "exemptions",
  initialState: getExemptionData(FORMATTED_FY),
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
