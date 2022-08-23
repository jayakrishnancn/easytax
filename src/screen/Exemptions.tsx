import { useEffect, useState } from "react";
import FieldRow from "../components/FieldRow";
import Input from "../components/Input";
import TableCell from "../components/TableCell";
import { EXEMPTIONS } from "../enum/exemptionsFields";
import { sum } from "../util/arrayUtil";
import { currencyFormat } from "../util/currencyFormat";
import { getLocalData, setLocalData } from "../util/localStorage";

function Details({ title = "", desc = "" }) {
  return (
    <div>
      <div>{title}</div>
      <div>{desc}</div>
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

  const changeField = (field: string, value: number) => {
    setFieldValues((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const totalExemptions = sum(Object.values(fieldValues));

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
            {EXEMPTIONS.map(({ min = 0, max = Infinity, title }) => {
              return (
                <FieldRow key={title}>
                  <TableCell bold>
                    <Details title={title} />
                  </TableCell>
                  <TableCell>{max ?? "Infinity"}</TableCell>
                  <TableCell>
                    <Input
                      max={max}
                      value={fieldValues[title]}
                      defaultValue={fieldValues[title]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let value = Number(e.target.value) || 0;
                        if (value < min || value > max) {
                          return false;
                        }
                        changeField(title, value);
                      }}
                    />
                  </TableCell>
                </FieldRow>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Exemptions;
