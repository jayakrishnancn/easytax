import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import ProgressBar from "../components/Progressbar";
import Tick from "../components/Tick";
import { EXEMPTIONS } from "../constants/exemptionFields";
import { ExemptionFieldsEnum } from "../enum/exemptionFields";
import { RootState } from "../store";
import { changeExemptionField } from "../store/reducers/exemptionsReducer";
import HRA from "../util/calculations/hra";
import { currencyFormat } from "../util/currencyFormat";
import { calculateTotalExemptions } from "../util/exemptionUtils";

function ExemptionsTab() {
  const [intiallySorted, setIntiallySorted] = useState(false);
  const exemptions = useSelector((state: RootState) => state.exemptions);
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
      })
    );
  };

  function WithTick(props: any) {
    return (
      <div className="flex justify-between">
        <span>{props.if && <Tick />}</span>
        <span>{props.text || ""}</span>
      </div>
    );
  }

  const totalExemptions = useMemo(() => {
    return currencyFormat(calculateTotalExemptions(exemptions));
  }, [exemptions]);

  useEffect(() => {
    if (!intiallySorted) {
      EXEMPTIONS.sort((a, b) => {
        let bvalue = Number(exemptions[b.title]) || 0;
        let aValue = Number(exemptions[a.title]) || 0;
        return bvalue - aValue;
      });
      setIntiallySorted(true);
    }
  }, [exemptions, intiallySorted]);
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
      })
    );

    return tmp;
  }, [dispatch, income, isMetro, rentPaid]);

  const isMetroCity = !!exemptions[ExemptionFieldsEnum["Is metro city"]];

  return (
    <table className="income-table w-full table-fixed text-left">
      <thead>
        <tr className="bg-orange-600 text-white">
          <td colSpan={2}>Total Exemptions & deductions</td>
          <td className="text-right">{totalExemptions}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>HRA - Rent per month</td>
          <td>
            <ProgressBar
              current={getFieldValue(ExemptionFieldsEnum["Rent paid"])}
              max={hra.optimalRent()}
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
        <tr>
          <td colSpan={2} className="text-right">
            <WithTick
              if={hra.current === 0}
              text="House Rent Paid - 10% of Basic + DA"
            />
          </td>
          <td>{currencyFormat(hra.A_10perBaseAndDA)}</td>
        </tr>
        <tr>
          <td colSpan={2} className="text-right">
            <WithTick
              if={hra.current === 1}
              text={`${isMetroCity ? 50 : 40}% of Basic + DA in
              ${isMetroCity ? "" : " Non "} Metros`}
            />
          </td>
          <td>{currencyFormat(hra.B_50PerBaseAndDA)}</td>
        </tr>
        <tr>
          <td colSpan={2} className="text-right">
            <WithTick if={hra.current === 2} text="HRA Received" />
          </td>
          <td>{currencyFormat(hra.HRAReceived)}</td>
        </tr>
        <tr>
          <td colSpan={2} className="text-right">
            Total
          </td>
          <td>{currencyFormat(hra.calcaulteMaxHRA())}</td>
        </tr>
        {EXEMPTIONS.map(({ title, value, max = Infinity, isDisabled }) => (
          <tr key={title}>
            <td>{title}</td>
            <td>
              <ProgressBar
                current={value ?? Number(exemptions[title])}
                max={max}
              />
            </td>
            <td>
              <Input
                disabled={isDisabled}
                value={value ?? getFieldValue(title)}
                onChange={(value) => {
                  changeField(title, value);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default ExemptionsTab;
