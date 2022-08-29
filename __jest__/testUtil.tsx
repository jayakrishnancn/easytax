import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ExemptionFieldsEnum } from "../src/enum/exemptionFields";
import { IncomeFieldsEnum } from "../src/enum/incomeFields";
import store from "../src/store";
import { resetExemptions } from "../src/store/reducers/exemptionsReducer";
import { resetIncome } from "../src/store/reducers/incomeReducer";
import { ExemptionsType } from "../src/store/reducers/type";
import { IncomeFields } from "../src/type/income";
export function renderWithStore(component: ReactNode) {
  return render(<Provider store={store}>{component}</Provider>);
}

export async function waitForStore(time = 5) {
  await new Promise((r) => setTimeout(r, 5));
}

export function resetExemptionsForTest() {
  const values = Object.values(ExemptionFieldsEnum).reduce(
    (acc, i) => ({ ...acc, [i]: 0 }),
    {} as ExemptionsType
  );
  store.dispatch(resetExemptions(values));
}

export function resetIncomeForTest() {
  const values = Object.values(IncomeFieldsEnum).reduce(
    (acc, i: IncomeFieldsEnum) => ({
      ...acc,
      [i]: { value: 0, isMonthly: false },
    }),
    {} as IncomeFields
  );
  store.dispatch(resetIncome(values));
}
