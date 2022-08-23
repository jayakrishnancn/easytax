import { useEffect, useState } from "react";
import FieldRow from "../components/FieldRow";
import Input from "../components/Input";
import TableCell from "../components/TableCell";
import Toggle from "../components/Toggle";
import { INCOME_FIELDS, SALARY_FIELDS } from "../enum/incomeFields";
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

function IncomeTab(props: Props) {
  const [fieldValues, setFieldValues] = useState<any>(
    getLocalData(STORE_KEYS.Fields)
  );
  const [totalSalary, setTotalSalary] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const { onChange } = props;
  const changeMonthly = (field: string, value: boolean) => {
    setFieldValues((prev: any) => ({
      ...prev,
      [field]: { ...prev[field], monthly: value },
    }));
  };

  const changeField = (field: string, value: string) => {
    setFieldValues((prev: any) => ({
      ...prev,
      [field]: { ...prev[field], value },
    }));
  };

  useEffect(() => {
    const totalSalary = sum(
      SALARY_FIELDS.map((field) => {
        if (fieldValues[field]) {
          let value = Number(fieldValues[field].value) ?? 0;
          if (fieldValues[field].monthly) {
            value = value * 12;
          }
          return value;
        }
        return 0;
      })
    );
    const totalIncome = sum(
      INCOME_FIELDS.map((field) => {
        if (fieldValues[field]) {
          let value = Number(fieldValues[field].value) ?? 0;
          if (fieldValues[field].monthly) {
            value = value * 12;
          }
          return value;
        }
        return 0;
      })
    );
    setTotalSalary(totalSalary);
    setTotalIncome(totalIncome + totalSalary);
    onChange(totalIncome);

    setLocalData(STORE_KEYS.Fields, fieldValues);
  }, [fieldValues, onChange]);

  return (
    <div className="flex-1 p-3">
      <div className="mx-auto mt-10 overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="flex font-bold text-xs text-white uppercase bg-blue-600 ">
          <div className="py-3 px-6">Income</div>
          <div className="ml-auto text-right py-3 px-6 pr-8">
            {currencyFormat(totalIncome)}
          </div>
        </div>
      </div>
      <div className="border mx-auto mt-2 overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <tbody>
            <FieldRow>
              <TableCell bold colSpan={3}>
                <Details title={"Salary"} />
              </TableCell>
              <TableCell>
                <div className="text-right">{currencyFormat(totalSalary)}</div>
              </TableCell>
            </FieldRow>
            <tr>
              <td></td>
              <td colSpan={3}>
                <table className="w-full text-sm text-left text-gray-500">
                  <tbody>
                    {SALARY_FIELDS.map((field) => (
                      <FieldRow key={field}>
                        <TableCell>
                          <Details title={field} />
                        </TableCell>
                        <TableCell>
                          <Toggle
                            label="Monthly"
                            isEnabled={fieldValues[field]?.monthly}
                            onChange={(value: boolean) =>
                              changeMonthly(field, value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            defaultValue={fieldValues[field]?.value}
                            onChange={(e: any) => {
                              changeField(field, e.target.value);
                            }}
                          />
                        </TableCell>
                      </FieldRow>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            {INCOME_FIELDS.map((field) => (
              <FieldRow key={field}>
                <TableCell bold colSpan={2}>
                  <Details title={field} />
                </TableCell>
                <TableCell>
                  <Toggle
                    label="Monthly"
                    isEnabled={fieldValues[field]?.monthly}
                    onChange={(value: boolean) => changeMonthly(field, value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      changeField(field, e.target.value);
                    }}
                  />
                </TableCell>
              </FieldRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IncomeTab;
