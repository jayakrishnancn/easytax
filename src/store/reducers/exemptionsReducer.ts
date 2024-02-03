import { createSlice } from "@reduxjs/toolkit";
import { getExemptionData, saveExemptionData } from "../../services/exemptions";
import { getFormattedYear } from "./../../util/calender";
import { ChangeExemptionFieldAction, InitializeExemptionAction } from "./type";

export const exemptionsSlice = createSlice({
  name: "exemptions",
  initialState: getExemptionData(getFormattedYear()),
  reducers: {
    resetExemptions(state, action: InitializeExemptionAction) {
      return { ...action.payload };
    },
    changeExemptionField: (state, action: ChangeExemptionFieldAction) => {
      const { field, value, year = getFormattedYear() } = action.payload;
      const newState = {
        ...state,
        [field]: value,
      };
      saveExemptionData(newState, year);
      return newState;
    },
    clearExemptionData(){
      return getExemptionData(getFormattedYear())
    }
  },
});

// Action creators are generated for each case reducer function
export const { changeExemptionField, resetExemptions , clearExemptionData } =
  exemptionsSlice.actions;

export default exemptionsSlice.reducer;
