import { configureStore } from "@reduxjs/toolkit";
import exemptionsReducer from "./reducers/exemptionsReducer";
import incomeReducer from "./reducers/incomeReducer";

const store = configureStore({
  reducer: {
    income: incomeReducer,
    exemptions: exemptionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
