import { screen } from "@testing-library/react";
import { IncomeFieldsEnum } from "../../enum/incomeFields";
import store from "../../store";
import { changeIncomeField } from "../../store/reducers/incomeReducer";
import { currencyFormat } from "../../util/currencyFormat";
import { renderWithStore } from "../../util/testUtil";
import Compare from "../Compare";

const oldTestId = "Tax as per old regime";
const newTestId = "Tax as per new regime";
const saveByOldTestId = "save amount using Tax as per old regime";
const saveByNewTestId = "save amount using Tax as per new regime";

describe("<Description />", () => {
  test("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    renderWithStore(<Compare />);

    expect(spy).not.toHaveBeenCalled();
  });

  test("should contain 'Tax as per Old Regime' and 'Tax as per New Regime'", () => {
    renderWithStore(<Compare />);

    const oldRegime = screen.getByText(oldTestId);
    const newRegime = screen.getByText(newTestId);

    expect(oldRegime).toBeInTheDocument();
    expect(newRegime).toBeInTheDocument();
  });

  test("Default Value should be ₹0.00", () => {
    store.dispatch(
      changeIncomeField({
        field: IncomeFieldsEnum.salary_basicDA,
        value: 5000000,
        isMonthly: false,
      })
    );

    renderWithStore(<Compare />);

    const oldRegime = screen.getByLabelText(oldTestId);
    const newRegime = screen.getByLabelText(newTestId);

    expect(oldRegime).toHaveTextContent("₹0.00");
    expect(newRegime).toHaveTextContent("₹0.00");
  });

  test("if old value = new value, save button should be hidden", () => {
    renderWithStore(<Compare />);

    const submitButton = screen.queryByText("Save");
    expect(submitButton).not.toBeInTheDocument();
  });

  test("heighlight new regime", () => {
    const basic_DA = 1000000;
    const taxOld = currencyFormat(1_06_600);
    const taxNew = currencyFormat(78_000);
    const saveAmount = "Save ₹28,600.00";

    store.dispatch(
      changeIncomeField({
        field: IncomeFieldsEnum.salary_basicDA,
        value: basic_DA,
        isMonthly: false,
      })
    );
    renderWithStore(<Compare />);

    const oldRegime = screen.getByLabelText(oldTestId);
    const newRegime = screen.getByLabelText(newTestId);

    const save = screen.queryByLabelText(saveByNewTestId);

    expect(oldRegime).toHaveTextContent(taxOld);
    expect(newRegime).toHaveTextContent(taxNew);
    expect(save).toHaveTextContent(saveAmount);
  });

  test("heighlight old regime", () => {
    const basic_DA = 500001;
    const taxOld = currencyFormat(0);
    const taxNew = currencyFormat(13_000.1);
    const saveAmount = "Save ₹13,000.10";

    store.dispatch(
      changeIncomeField({
        field: IncomeFieldsEnum.salary_basicDA,
        value: basic_DA,
        isMonthly: false,
      })
    );
    renderWithStore(<Compare />);

    const oldRegime = screen.getByLabelText(oldTestId);
    const newRegime = screen.getByLabelText(newTestId);

    const save = screen.queryByLabelText(saveByOldTestId);

    expect(oldRegime).toHaveTextContent(taxOld);
    expect(newRegime).toHaveTextContent(taxNew);
    expect(save).toHaveTextContent(saveAmount);
  });

  test("chagne heighlight old -> new & new -> old regime", async () => {
    // setting 5_00_001 will set optimal to old
    store.dispatch(
      changeIncomeField({
        field: IncomeFieldsEnum.salary_basicDA,
        value: 5_00_001,
        isMonthly: false,
      })
    );
    renderWithStore(<Compare />);

    const save = screen.queryByLabelText(saveByOldTestId);
    expect(store.getState().income["Salary (Basic + DA)"].value).toEqual(
      500001
    );
    expect(screen.queryByLabelText(oldTestId)).toHaveTextContent("₹0.00");
    expect(screen.queryByLabelText(newTestId)).toHaveTextContent("₹13,000.10");
    expect(save).toHaveTextContent("Save ₹13,000.10");
    expect(screen.queryByLabelText(saveByNewTestId)).not.toBeInTheDocument();

    // dispatch base+da field with 5000001
    // 50_00_001 will change optimal tax to new regime
    store.dispatch(
      changeIncomeField({
        field: IncomeFieldsEnum.salary_basicDA,
        value: 50_00_001,
        isMonthly: false,
      })
    );
    await new Promise((r) => setTimeout(r, 5));
    expect(store.getState().income["Salary (Basic + DA)"].value).toEqual(
      5000001
    );
    expect(screen.queryByLabelText(oldTestId)).toHaveTextContent(
      "₹13,49,400.31"
    );
    expect(screen.queryByLabelText(newTestId)).toHaveTextContent(
      "₹12,87,000.31"
    );
    expect(screen.queryByLabelText(saveByOldTestId)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(saveByNewTestId)).toHaveTextContent(
      "Save ₹62,400.00"
    );

    // change back to zero
    store.dispatch(
      changeIncomeField({
        field: IncomeFieldsEnum.salary_basicDA,
        value: 0,
        isMonthly: false,
      })
    );
    await new Promise((r) => setTimeout(r, 5));
    expect(store.getState().income["Salary (Basic + DA)"].value).toEqual(0);
    expect(screen.queryByLabelText(oldTestId)).toHaveTextContent("₹0.00");
    expect(screen.queryByLabelText(newTestId)).toHaveTextContent("₹0.00");
    expect(screen.queryByLabelText(saveByOldTestId)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(saveByNewTestId)).not.toBeInTheDocument();
  });
});
