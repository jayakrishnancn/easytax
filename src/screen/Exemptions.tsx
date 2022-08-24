import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import ProgressBar from "../components/Progressbar";
import { EXEMPTIONS } from "../constants/exemptionFields";
import { ExemptionFieldsEnum } from "../enum/exemptionFields";
import { RootState } from "../store";
import { changeExemptionField } from "../store/reducers/exemptionsReducer";
import { currencyFormat } from "../util/currencyFormat";
import { calculateTotalExemptions } from "../util/exemptionUtils";

function ExemptionsTab() {
  const exemptions = useSelector((state: RootState) => state.exemptions);
  const dispatch = useDispatch();
  const getFieldValue = (field: ExemptionFieldsEnum) => {
    let value = Number(exemptions[field]) || 0;
    return value;
  };

  const changeField = (field: ExemptionFieldsEnum, value: number) => {
    dispatch(
      changeExemptionField({
        field,
        value,
      })
    );
  };

  const totalExemptions = useMemo(
    () => currencyFormat(calculateTotalExemptions(exemptions)),
    [exemptions]
  );

  return (
    <table className="income-table w-full table-fixed text-left">
      <thead>
        <tr className="bg-orange-600 text-white">
          <td colSpan={2}>Total Exemptions & deductions</td>
          <td className="text-right">{totalExemptions}</td>
        </tr>
      </thead>
      <tbody>
        {EXEMPTIONS.map(({ title, value }) => (
          <tr key={title}>
            <td>{title}</td>
            <td>
              <ProgressBar current={30} max={100} />
            </td>
            <td>
              <Input
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
