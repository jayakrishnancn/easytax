import { useEffect, useMemo, useState } from "react";
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
  const [intiallySorted, setIntiallySorted] = useState(false);
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

  return (
    <table className="income-table w-full table-fixed text-left">
      <thead>
        <tr className="bg-orange-600 text-white">
          <td colSpan={2}>Total Exemptions & deductions</td>
          <td className="text-right">{totalExemptions}</td>
        </tr>
      </thead>
      <tbody>
        {EXEMPTIONS.map(({ title, value, max = Infinity, isDisabled }) => (
          <tr key={title}>
            <td>{title}</td>
            <td>
              <ProgressBar current={value ?? exemptions[title]} max={max} />
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
