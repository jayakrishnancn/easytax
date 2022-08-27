import { screen } from "@testing-library/react";
import { ExemptionFieldsEnum } from "../../enum/exemptionFields";
import store from "../../store";
import {
  changeExemptionField,
  resetExemptions,
} from "../../store/reducers/exemptionsReducer";
import {
  renderWithStore,
  resetExemptionsForTest,
  waitForStore,
} from "../../util/testUtil";
import ExemptionsTab from "../ExemptionsTab";
import { ExemptionsType } from "../../store/reducers/type";
import { changeIncomeField } from "../../store/reducers/incomeReducer";
import { IncomeFieldsEnum } from "../../enum/incomeFields";

describe("<ExemptionsTab />", () => {
  beforeEach(() => {
    resetExemptionsForTest();
  });

  test("Expect to not log errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    renderWithStore(<ExemptionsTab />);
    expect(spy).not.toHaveBeenCalled();
  });

  test("should have all the fields and Total Exemptions & Deductions", () => {
    renderWithStore(<ExemptionsTab />);

    const totalExemptionsText = "Total Exemptions & Deductions";

    expect(screen.getByText(totalExemptionsText)).toBeInTheDocument();
    expect(screen.queryByTestId("Total Exemptions")).toHaveTextContent(
      "₹50,000.00"
    );
    const fields = Object.values(ExemptionFieldsEnum).filter(
      (i) =>
        ![
          ExemptionFieldsEnum["Rent paid"],
          ExemptionFieldsEnum["Is metro city"],
          ExemptionFieldsEnum["HRA"],
        ].includes(i)
    );

    fields.forEach((title) => {
      const value =
        title === ExemptionFieldsEnum["Standard Deduction"] ? 50000 : 0;
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByTestId("input-" + title)).toHaveValue(value + "");
    });
  });

  test("should change values of all fields and Total Exemptions & Deductions should change", async () => {
    renderWithStore(<ExemptionsTab />);

    const fields = Object.values(ExemptionFieldsEnum).filter(
      (i) =>
        ![
          ExemptionFieldsEnum["Rent paid"],
          ExemptionFieldsEnum["Is metro city"],
          ExemptionFieldsEnum["HRA"],
        ].includes(i)
    );
    const values = Object.values(ExemptionFieldsEnum).reduce(
      (o, i) => ({ ...o, [i]: 100 }),
      {} as ExemptionsType
    );

    store.dispatch(resetExemptions(values));

    await waitForStore();

    fields.forEach((title) => {
      const value =
        title === ExemptionFieldsEnum["Standard Deduction"] ? 50000 : 100;
      expect(screen.getByTestId("input-" + title)).toHaveValue(value + "");
    });
  });

  test("special fields", async () => {
    renderWithStore(<ExemptionsTab />);

    expect(screen.getByText("HRA")).toBeInTheDocument();
    expect(screen.getByText("Rent per month")).toBeInTheDocument();
    expect(
      screen.getByTestId("toggle-input-" + ExemptionFieldsEnum["Is metro city"])
    ).not.toBeChecked();

    const hrafields = [
      "House Rent Paid - 10% of Basic + DA",
      "40% of Basic + DA in Non Metros",
      "HRA Received",
    ];

    hrafields.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    store.dispatch(
      changeExemptionField({
        field: ExemptionFieldsEnum["Is metro city"],
        value: true,
      })
    );
    await waitForStore();

    expect(
      screen.getByTestId("toggle-input-" + ExemptionFieldsEnum["Is metro city"])
    ).toBeChecked();

    const hrafieldsMetro = [
      "House Rent Paid - 10% of Basic + DA",
      "50% of Basic + DA in Metros",
      "HRA Received",
    ];
    hrafieldsMetro.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  test("hra calculation", async () => {
    renderWithStore(<ExemptionsTab />);

    store.dispatch(
      changeIncomeField({
        field: IncomeFieldsEnum.salary_basicDA,
        value: 150000,
      })
    );
    store.dispatch(
      changeIncomeField({
        field: IncomeFieldsEnum.salary_HRA,
        value: 150000,
      })
    );
    store.dispatch(
      changeExemptionField({
        field: ExemptionFieldsEnum["Rent paid"],
        value: 15000,
      })
    );
    await waitForStore();

    const hrafieldsMetro = [
      "House Rent Paid - 10% of Basic + DA",
      "Basic + DA in city",
      "HRA Received",
    ];

    expect(screen.getByTestId(hrafieldsMetro[0])).toHaveTextContent(
      "₹1,65,000.00"
    );
    expect(screen.getByTestId(hrafieldsMetro[1])).toHaveTextContent(
      "₹60,000.00"
    );
    expect(screen.getByTestId(hrafieldsMetro[2])).toHaveTextContent(
      "₹1,50,000.00"
    );
    expect(screen.getByTestId("input-Rent Paid")).toHaveValue("15000");
  });
});
