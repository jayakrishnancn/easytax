import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithStore } from "./util/testUtil";

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
