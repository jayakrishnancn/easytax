import { configureStore } from "@reduxjs/toolkit";
import detailedExemptionsReducer from "./reducers/detailedExemptionsReducer";
import exemptionsReducer from "./reducers/exemptionsReducer";
import incomeReducer from "./reducers/incomeReducer";
import taxYearReducer from "./reducers/taxYearReducer";

const store = configureStore({
  reducer: {
    income: incomeReducer,
    exemptions: exemptionsReducer,
    detailedExemptions: detailedExemptionsReducer,
    year: taxYearReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
