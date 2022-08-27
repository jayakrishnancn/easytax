import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithStore } from "./util/testUtil";
import MockDate from "mockdate";

describe("<App /> test timer on 2025-01-02", () => {
  test("change date and test dropdown values", () => {
    MockDate.set("3031-01-02");
    renderWithStore(<App />);

    expect(screen.getByTestId("select year")).toHaveValue(`FY 3030-3031`);
    expect(screen.getByTestId("select year")).not.toHaveValue(`FY 3031-3032`);

    MockDate.reset();
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
