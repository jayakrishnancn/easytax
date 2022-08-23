import { useEffect, useMemo, useState } from "react";
import FieldRow from "../components/FieldRow";
import Input from "../components/Input";
import TableCell from "../components/TableCell";
import { EXEMPTIONS, STANDARD_DEDUCTION } from "../constants/exemptionsFields";
import { sum } from "../util/arrayUtil";
import { currencyFormat } from "../util/currencyFormat";
import { getLocalData, setLocalData } from "../util/localStorage";

function Details({ title = "", desc = "" }) {
  return (
    <div>
      <div>{title}</div>
      <div className="text-gray-500 font-normal">{desc}</div>
    </div>
  );
}

interface Props {
  onChange: (arg: number) => void;
}
enum STORE_KEYS {
  Fields = "exemptionsFields",
}

function Exemptions(props: Props) {
  const [fieldValues, setFieldValues] = useState<any>(
    getLocalData(STORE_KEYS.Fields)
  );
  const [totalExemptions, setTotalExemptions] = useState<number>(0);

  const { onChange } = props;
  const localFieldValues = useMemo(() => getLocalData(STORE_KEYS.Fields), []);

  EXEMPTIONS.sort((a, b) => {
    const aValue = (Number(localFieldValues[a.title]) || a.value) ?? 0;
    const bValue = (Number(localFieldValues[b.title]) || b.value) ?? 0;
    return bValue - aValue;
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const changeField = (field: string, value: number) => {
    setFieldValues((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const totalExemptions =
      sum(Object.values(fieldValues)) + STANDARD_DEDUCTION;

    setTotalExemptions(totalExemptions);
    onChange(totalExemptions);

    setLocalData(STORE_KEYS.Fields, fieldValues);
  }, [fieldValues, onChange]);

  return (
    <div className="flex-1 p-3">
      <div className="mx-auto mt-10 overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="flex font-bold text-xs text-white uppercase bg-orange-600 ">
          <div className="py-3 px-6">Exemptions & Deductions</div>
          <div className="ml-auto text-right py-3 px-6 pr-8">
            {currencyFormat(totalExemptions)}
          </div>
        </div>
      </div>
      <div className="w-full border mx-auto mt-2 overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead>
            <tr>
              <th className="py-4 px-6 text-gray-900 bg-gray-200">Section</th>
              <th className="py-4 px-6 text-gray-900 bg-gray-200">
                Max Amount
              </th>
              <th className="py-4 px-6 text-gray-900 bg-gray-200">Amount</th>
            </tr>
          </thead>
          <tbody>
            {EXEMPTIONS.map(
              ({
                details,
                min = 0,
                max = Infinity,
                title,
                isDisabled,
                value,
              }) => {
                return (
                  <FieldRow key={title}>
                    <TableCell bold>
                      <Details title={title} desc={details} />
                    </TableCell>
                    <TableCell>{max ?? "Infinity"}</TableCell>
                    <TableCell>
                      <Input
                        defaultValue={fieldValues[title]}
                        disabled={isDisabled}
                        value={fieldValues[title] ?? value}
                        isValid={(newValue: number) => {
                          newValue = Number(newValue) || 0;
                          if (newValue < min || newValue > max) {
                            return false;
                          }
                          return true;
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          let value = Number(e.target.value) || 0;
                          changeField(title, value);
                          return true;
                        }}
                      />
                    </TableCell>
                  </FieldRow>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Exemptions;
