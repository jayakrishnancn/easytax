import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Toggle from "../components/Toggle";
import { IncomeFieldsEnum } from "../enum/incomeFields";
import { RootState } from "../store";
import { changeIncomeField } from "../store/reducers/incomeReducer";
import { currencyFormat } from "../util/currencyFormat";
import { calculateTotalIncome } from "../util/incomeUtils";

function IncomeTab() {
  const incomeFields = useSelector((state: RootState) => state.income);
  const year = useSelector((state: RootState) => state.year);
  const dispatch = useDispatch();
  const getFieldValue = (field: IncomeFieldsEnum) => {
    let value = Number(incomeFields[field].value) || 0;
    return { ...incomeFields[field], value };
  };

  const changeField = (field: IncomeFieldsEnum, value: number) => {
    dispatch(
      changeIncomeField({
        field,
        value,
        year,
      })
    );
  };
  const changeFieldMonthly = (field: IncomeFieldsEnum, isMonthly: boolean) => {
    dispatch(
      changeIncomeField({
        field,
        isMonthly,
        year,
      })
    );
  };
  const totalIncome = useMemo(
    () => currencyFormat(calculateTotalIncome(incomeFields)),
    [incomeFields]
  );

  return (
    <table className="income-table w-full table-fixed mt-4 mb-8 text-left">
      <thead>
        <tr className="bg-blue-600 text-white">
          <td colSpan={2}>Total Income</td>
          <td className="text-right">{totalIncome}</td>
        </tr>
      </thead>
      <tbody>
        {Object.values(IncomeFieldsEnum).map((field) => (
          <tr key={field}>
            <td> {field}</td>
            <td>
              <Toggle
                isEnabled={getFieldValue(field)?.isMonthly}
                onChange={(isMonthly) => changeFieldMonthly(field, isMonthly)}
                label="Monthly?"
              />
            </td>
            <td>
              <Input
                value={getFieldValue(field).value}
                onChange={(value) => {
                  changeField(field, value);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default IncomeTab;
