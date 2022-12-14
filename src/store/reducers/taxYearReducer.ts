import { createSlice } from "@reduxjs/toolkit";
import { getFormattedYear } from "../../util/calender";

export type taxYearAction = {
  payload: string;
  type: string;
};

export const taxYearSlice = createSlice({
  name: "year",
  initialState: getFormattedYear(),
  reducers: {
    loadYear: (state, action: taxYearAction) => {
      return action.payload;
    },
  },
});

export const { loadYear } = taxYearSlice.actions;

export default taxYearSlice.reducer;
