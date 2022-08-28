import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetailedModal80C from ".";
import { renderWithStore } from "../../util/testUtil";

describe("<DetailedModal80C />", () => {
  test("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");

    const onCancel = jest.fn();
    renderWithStore(<DetailedModal80C onCancel={onCancel} />);

    expect(spy).not.toHaveBeenCalled();
  });

  test("check close button, body, title etc.", () => {
    const onCancel = jest.fn();

    renderWithStore(<DetailedModal80C onCancel={onCancel} />);

    expect(
      screen.getByTestId("toggle-input-_80C-Employee provident fund")
    ).not.toBeChecked();
    expect(
      screen.getByTestId("input-_80C-Employee provident fund")
    ).toHaveValue("0");

    expect(screen.queryByLabelText("Total")).toHaveTextContent("₹0.00");
    expect(screen.queryByLabelText("Remaining")).toHaveTextContent(
      "₹1,50,000.00"
    );
  });

  test("change field values", () => {
    const onCancel = jest.fn();

    renderWithStore(<DetailedModal80C onCancel={onCancel} />);
    expect(screen.getByText("Close")).toBeInTheDocument();

    expect(
      screen.getByTestId("toggle-input-_80C-Employee provident fund")
    ).not.toBeChecked();
    expect(
      screen.getByTestId("input-_80C-Employee provident fund")
    ).toHaveValue("0");

    fireEvent.click(screen.getByText("Close"));
    expect(onCancel).toBeCalledTimes(1);

    // toggle epf field
    fireEvent.click(
      screen.getByTestId("toggle-input-_80C-Employee provident fund")
    );
    expect(
      screen.getByTestId("toggle-input-_80C-Employee provident fund")
    ).toBeChecked();

    // change user input
    userEvent.type(
      screen.getByTestId("input-_80C-Employee provident fund"),
      "1000"
    );
    expect(
      screen.getByTestId("input-_80C-Employee provident fund")
    ).toHaveValue("1000");
    expect(screen.queryByLabelText("Total")).toHaveTextContent("₹12,000.00");
    expect(screen.queryByLabelText("Remaining")).toHaveTextContent(
      "₹1,38,000.00"
    );
  });
});
