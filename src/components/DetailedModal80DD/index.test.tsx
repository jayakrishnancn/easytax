import { fireEvent, screen } from "@testing-library/react";
import DetailedModal80DD from ".";
import { renderWithStore } from "../../../__jest__/testUtil";
import { DetailedExemptionFieldsEnum } from "../../enum/detailedExemptionFields";

describe("<DetailedModal80CCD2 />", () => {
  test("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");

    const onCancel = jest.fn();
    renderWithStore(<DetailedModal80DD onCancel={onCancel} />);

    expect(spy).not.toHaveBeenCalled();
  });
  test("check close button, body, title etc.", () => {
    const onCancel = jest.fn();

    renderWithStore(<DetailedModal80DD onCancel={onCancel} />);

    expect(
      screen.getByTestId(
        "toggle-input-" + DetailedExemptionFieldsEnum["80DD-severe disability"]
      )
    ).not.toBeChecked();

    expect(screen.getByTestId("max-limit")).toHaveTextContent("₹75,000.00");

    fireEvent.click(
      screen.getByTestId(
        "toggle-input-" + DetailedExemptionFieldsEnum["80DD-severe disability"]
      )
    );

    expect(screen.getByTestId("max-limit")).toHaveTextContent("₹1,25,000.00");
  });
  test("should trigger close on close", () => {
    const onCancel = jest.fn();
    renderWithStore(<DetailedModal80DD onCancel={onCancel} />);

    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(onCancel).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByText("Close"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
