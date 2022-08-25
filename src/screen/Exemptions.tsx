import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Description from "../components/Description";
import Input from "../components/Input";
import ProgressBar from "../components/Progressbar";
import Toggle from "../components/Toggle";
import WithTick from "../components/WithTick";
import { EXEMPTIONS } from "../constants/exemptionFields";
import { ExemptionFieldsEnum } from "../enum/exemptionFields";
import { RootState } from "../store";
import { changeExemptionField } from "../store/reducers/exemptionsReducer";
import { calculateTotalExemptions } from "../util/calculations/exemptionUtils";
import HRA from "../util/calculations/hra";
import { currencyFormat } from "../util/currencyFormat";

function ExemptionsTab() {
  const [exemptionsFieldSorted, setExemptionsFieldSorted] =
    useState<string>("0");
  const exemptions = useSelector((state: RootState) => state.exemptions);
  const year = useSelector((state: RootState) => state.year);
  const income = useSelector((state: RootState) => state.income);

  const dispatch = useDispatch();

  const getFieldValue = useCallback(
    (field: ExemptionFieldsEnum) => {
      let value = Number(exemptions[field]) || 0;
      return value;
    },
    [exemptions]
  );

  const changeField = (field: ExemptionFieldsEnum, value: number) => {
    dispatch(
      changeExemptionField({
        field,
        value,
        year,
      })
    );
  };

  const totalExemptions = useMemo(() => {
    return currencyFormat(calculateTotalExemptions(exemptions));
  }, [exemptions]);

  useEffect(() => {
    if (year !== exemptionsFieldSorted) {
      EXEMPTIONS.sort((a, b) => {
        let bvalue = Number(exemptions[b.title]) || Number(b.value) || 0;
        let aValue = Number(exemptions[a.title]) || Number(a.value) || 0;
        return bvalue - aValue;
      });
      setExemptionsFieldSorted(year);
    }
  }, [exemptions, exemptionsFieldSorted, year]);
  const rentPaid = getFieldValue(ExemptionFieldsEnum["Rent paid"]);
  const isMetro = exemptions[ExemptionFieldsEnum["Is metro city"]];

  const hra = useMemo(() => {
    const salaryBasicDA = income["Salary (Basic + DA)"];
    const salaryHRA = income["Salary (HRA)"];

    const tmp = new HRA(
      (Number(salaryBasicDA?.value) || 0) * (salaryBasicDA.isMonthly ? 12 : 1),
      (Number(salaryHRA?.value) || 0) * (salaryHRA.isMonthly ? 12 : 1),
      rentPaid,
      isMetro
    );

    dispatch(
      changeExemptionField({
        value: tmp.calcaulteMaxHRA(),
        field: ExemptionFieldsEnum.HRA,
        year,
      })
    );

    return tmp;
  }, [dispatch, income, isMetro, rentPaid, year]);

  const isMetroCity = !!exemptions[ExemptionFieldsEnum["Is metro city"]];

  const getMaximumValue = useCallback(
    (title: ExemptionFieldsEnum): number | null => {
      const percent = income["Govt Employee"].isMonthly ? 0.14 : 0.1;
      if (title === ExemptionFieldsEnum["80CCD_2_"]) {
        const salaryBasicDA = income["Salary (Basic + DA)"];
        return Math.floor(
          percent *
            ((Number(salaryBasicDA?.value) || 0) *
              (salaryBasicDA.isMonthly ? 12 : 1))
        );
      }
      return null;
    },
    [income]
  );

  return (
    <table className="income-table w-full table-fixed mt-4 mb-8 text-left">
      <thead>
        <tr className="bg-orange-600 text-white">
          <td colSpan={2}>Total Exemptions & deductions</td>
          <td className="text-right">{totalExemptions}</td>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-200">
          <td>HRA</td>
          <td>
            <ProgressBar
              current={getFieldValue(ExemptionFieldsEnum["Rent paid"])}
              max={hra.optimalRent()}
            />
          </td>
          <td className="text-center">
            {currencyFormat(hra.calcaulteMaxHRA())}
          </td>
        </tr>
        <tr className="bg-gray-200">
          <td>Rent per month</td>
          <td>
            <Toggle
              isEnabled={exemptions[ExemptionFieldsEnum["Is metro city"]]}
              onChange={(value) => {
                changeField(ExemptionFieldsEnum["Is metro city"], value);
              }}
              label="Metro city?"
            />
          </td>
          <td>
            <Input
              value={getFieldValue(ExemptionFieldsEnum["Rent paid"])}
              onChange={(value) => {
                changeField(ExemptionFieldsEnum["Rent paid"], value);
              }}
            />
          </td>
        </tr>
        <tr className="bg-gray-200">
          <td colSpan={2} className="text-right">
            <WithTick
              if={hra.current === 0}
              text="House Rent Paid - 10% of Basic + DA"
            />
          </td>
          <td>{currencyFormat(hra.A_10perBaseAndDA)}</td>
        </tr>
        <tr className="bg-gray-200">
          <td colSpan={2} className="text-right">
            <WithTick
              if={hra.current === 1}
              text={`${isMetroCity ? 50 : 40}% of Basic + DA in
              ${isMetroCity ? "" : " Non "} Metros`}
            />
          </td>
          <td>{currencyFormat(hra.B_50PerBaseAndDA)}</td>
        </tr>
        <tr className="bg-gray-200">
          <td colSpan={2} className="text-right">
            <WithTick if={hra.current === 2} text="HRA Received" />
          </td>
          <td>{currencyFormat(hra.HRAReceived)}</td>
        </tr>

        {EXEMPTIONS.map(
          ({ title, value, max = Infinity, isDisabled, details }) => (
            <tr key={title}>
              <td>
                <Description title={title} details={details} />
              </td>
              <td>
                <ProgressBar
                  current={value ?? Number(exemptions[title])}
                  max={getMaximumValue(title) ?? max}
                />
              </td>
              <td>
                <Input
                  disabled={isDisabled}
                  value={value ?? getFieldValue(title)}
                  onChange={(value) => {
                    changeField(title, value);
                  }}
                  max={getMaximumValue(title) ?? max}
                />
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
export default ExemptionsTab;
