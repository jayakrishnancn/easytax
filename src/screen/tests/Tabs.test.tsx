import { fireEvent, screen } from "@testing-library/react";
import { renderWithStore } from "../../util/testUtil";
import Tabs from "../Tabs";

jest.mock("../IncomeTab.tsx", () => () => <div>IncomeTab-mocked</div>);
jest.mock("../ExemptionsTab.tsx", () => () => <div>ExemptionsTab-mocked</div>);

describe("<Tabs /> mocked", () => {
  test("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    renderWithStore(<Tabs />);
    expect(spy).not.toHaveBeenCalled();
  });

  test("check if tab has income and exemption", () => {
    renderWithStore(<Tabs />);

    expect(screen.getAllByRole("tab").map((item) => item.textContent)).toEqual([
      "Income",
      "Exemptions & Deductions",
    ]);
  });
  test("click on Income -> Exemptions & Deductions", () => {
    renderWithStore(<Tabs />);
    expect(screen.queryByText("ExemptionsTab-mocked")).not.toBeInTheDocument();
    expect(screen.getByText("IncomeTab-mocked")).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("tab", { name: "Exemptions & Deductions" })
    );

    expect(screen.queryByText("IncomeTab-mocked")).not.toBeInTheDocument();
    expect(screen.getByText("ExemptionsTab-mocked")).toBeInTheDocument();
  });
  test("click on Exe->Income", () => {
    renderWithStore(<Tabs />);

    fireEvent.click(
      screen.getByRole("tab", { name: "Exemptions & Deductions" })
    );
    expect(screen.queryByText("IncomeTab-mocked")).not.toBeInTheDocument();
    expect(screen.getByText("ExemptionsTab-mocked")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Income" }));

    expect(screen.queryByText("ExemptionsTab-mocked")).not.toBeInTheDocument();
    expect(screen.getByText("IncomeTab-mocked")).toBeInTheDocument();
  });
});
