import { fireEvent, screen } from "@testing-library/react";
import DetailedModal80CCD2 from ".";
import { renderWithStore } from "../../../__jest__/testUtil";
import { DetailedExemptionFieldsEnum } from "../../enum/detailedExemptionFields";
import { IncomeFieldsEnum } from "../../enum/incomeFields";
import store from "../../store";
import { changeIncomeField } from "../../store/reducers/incomeReducer";

describe("<DetailedModal80CCD2 />", () => {
  test("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");

    const onCancel = jest.fn();
    renderWithStore(<DetailedModal80CCD2 onCancel={onCancel} />);

    expect(spy).not.toHaveBeenCalled();
  });
  test("check close button, body, title etc.", () => {
    const onCancel = jest.fn();
    store.dispatch(
      changeIncomeField({
        field: IncomeFieldsEnum.salary_basicDA,
        value: 100000,
        isMonthly: false,
      })
    );
    renderWithStore(<DetailedModal80CCD2 onCancel={onCancel} />);

    expect(
      screen.getByTestId(
        "toggle-input-" + DetailedExemptionFieldsEnum["80CCD_2-Govt Employee"]
      )
    ).not.toBeChecked();

    expect(screen.getByTestId("max-limit")).toHaveTextContent("₹10,000.00");

    fireEvent.click(
      screen.getByTestId(
        "toggle-input-" + DetailedExemptionFieldsEnum["80CCD_2-Govt Employee"]
      )
    );

    expect(screen.getByTestId("max-limit")).toHaveTextContent("₹14,000.00");
  });
});
