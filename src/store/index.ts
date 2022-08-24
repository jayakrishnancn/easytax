import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "./reducers/incomeReducer";

const store = configureStore({
  reducer: {
    income: incomeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
