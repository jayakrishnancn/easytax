import { screen } from "@testing-library/react";
import { IncomeFieldsEnum } from "../../enum/incomeFields";
import store from "../../store";
import {
  changeIncomeField,
  resetIncome,
} from "../../store/reducers/incomeReducer";
import { IncomeFields } from "../../type/income";
import { renderWithStore, waitForStore } from "../../util/testUtil";
import IncomeTab from "../IncomeTab";

describe("<IncomeTab />", () => {
  test("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    renderWithStore(<IncomeTab />);
    expect(spy).not.toHaveBeenCalled();
  });

  test("Expect to have Total Income", async () => {
    store.dispatch(
      changeIncomeField({
        field: IncomeFieldsEnum.salary_basicDA,
        value: 1000,
        isMonthly: true,
      })
    );
    renderWithStore(<IncomeTab />);
    expect(screen.queryByText("Total Income")).toHaveTextContent(
      "Total Income"
    );
    expect(screen.queryByLabelText("Total income")).toHaveTextContent(
      "₹12,000.00"
    );
    // reset to 0, monthly=false
    store.dispatch(
      changeIncomeField({
        field: IncomeFieldsEnum.salary_basicDA,
        value: 0,
        isMonthly: false,
      })
    );
    await waitForStore();
    expect(screen.queryByLabelText("Total income")).toHaveTextContent("₹0.00");
  });

  test("Enable all monthly toggle button", async () => {
    const toggleTestIds = Object.values(IncomeFieldsEnum);

    // for each field isMonthly=true & value in 1,2,3...
    const testData = toggleTestIds.reduce(
      (obj, id, index) => ({
        ...obj,
        [id]: { value: index + 1, isMonthly: true },
      }),
      {} as IncomeFields
    );
    store.dispatch(resetIncome(testData));
    renderWithStore(<IncomeTab />);

    toggleTestIds.forEach((id, index) => {
      const testId = "toggle-input-" + id;
      const valueId = "input-" + id;
      expect(screen.getByTestId(testId)).toBeInTheDocument();
      expect(screen.getByTestId(valueId)).toHaveValue(index + 1 + "");
      expect(screen.getByTestId(testId)).toBeChecked();
    });
    expect(screen.queryByLabelText("Total income")).toHaveTextContent(
      "₹336.00"
    );

    // reset and check if all are false
    const initValue = toggleTestIds.reduce(
      (obj, id) => ({ ...obj, [id]: { value: 0, isMonthly: false } }),
      {} as IncomeFields
    );
    store.dispatch(resetIncome(initValue));

    await waitForStore();

    toggleTestIds.forEach((id) => {
      const testId = "toggle-input-" + id;
      const valueId = "input-" + id;
      expect(screen.getByTestId(testId)).not.toBeChecked();
      expect(screen.getByTestId(valueId)).toHaveValue("0");
    });

    await waitForStore();
  });
});
