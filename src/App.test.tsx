import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockDate from "mockdate";
import App from "./App";
import { IncomeFieldsEnum } from "./enum/incomeFields";
import { renderWithStore } from "./util/testUtil";

describe("<App /> test timer on 2025-01-02", () => {
  beforeAll(() => {
    MockDate.set("3031-01-02");
  });
  afterAll(() => {
    MockDate.reset();
  });

  test("change date and test dropdown values", () => {
    renderWithStore(<App />);

    expect(screen.getByTestId("select year")).toHaveValue(`FY 3030-3031`);
    expect(screen.getByTestId("select year")).not.toHaveValue(`FY 3031-3032`);
  });

  test("change value of year dropdown", () => {
    renderWithStore(<App />);
    expect(screen.getByTestId("select year")).toHaveValue(`FY 3030-3031`);
    userEvent.selectOptions(screen.getByTestId("select year"), "FY 2020-2021");

    expect(screen.getByTestId("select year")).toHaveValue(`FY 2020-2021`);

    userEvent.selectOptions(screen.getByTestId("select year"), "FY 2030-2031");
    expect(screen.getByTestId("select year")).toHaveValue(`FY 2030-2031`);
  });

  test("change value of year dropdown back to prev and check", () => {
    renderWithStore(<App />);
    expect(screen.getByTestId("select year")).toHaveValue(`FY 3030-3031`);
    expect(
      screen.getByTestId("toggle-input-" + IncomeFieldsEnum.salary_basicDA)
    ).not.toBeChecked();

    fireEvent.click(
      screen.getByTestId("toggle-input-" + IncomeFieldsEnum.salary_basicDA)
    );
    expect(
      screen.getByTestId("toggle-input-" + IncomeFieldsEnum.salary_basicDA)
    ).toBeChecked();

    userEvent.selectOptions(screen.getByTestId("select year"), "FY 2020-2021");
    expect(screen.getByTestId("select year")).toHaveValue(`FY 2020-2021`);
    expect(
      screen.getByTestId("toggle-input-" + IncomeFieldsEnum.salary_basicDA)
    ).not.toBeChecked();

    userEvent.selectOptions(screen.getByTestId("select year"), "FY 2030-2031");
    expect(screen.getByTestId("select year")).toHaveValue(`FY 2030-2031`);
    expect(
      screen.getByTestId("toggle-input-" + IncomeFieldsEnum.salary_basicDA)
    ).toBeChecked();
  });
});

describe("<App />", () => {
  test("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    renderWithStore(<App />);
    expect(spy).not.toHaveBeenCalled();
  });

  test("renders Simple Tax title", () => {
    renderWithStore(<App />);
    const linkElement = screen.getByText(/Simple Tax/);
    expect(linkElement).toBeInTheDocument();
  });

  test("should contain 'Tax as per Old Regime' and 'Tax as per New Regime'", () => {
    const OLD = "Tax as per old regime";
    const NEW = "Tax as per new regime";

    renderWithStore(<App />);

    const oldRegime = screen.getByText(OLD);
    const newRegime = screen.getByText(NEW);

    expect(oldRegime).toBeInTheDocument();
    expect(newRegime).toBeInTheDocument();
  });
});
