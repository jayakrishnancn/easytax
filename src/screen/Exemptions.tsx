import { useEffect, useMemo, useState } from "react";
import FieldRow from "../components/FieldRow";
import Input from "../components/Input";
import ProgressBar from "../components/Progressbar";
import TableCell from "../components/TableCell";
import Toggle from "../components/Toggle";
import { EXEMPTIONS, STANDARD_DEDUCTION } from "../constants/exemptionsFields";
import { sum } from "../util/arrayUtil";
import HRA from "../util/calculations/hra";
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
  baseAmount?: number;
  hraAmount?: number;
}
enum STORE_KEYS {
  Fields = "exemptionsFields",
}
enum HRAFieldsEnum {
  isMetroCity = "isMetroCity",
  rentPaid = "rentPaid",
}
function Exemptions(props: Props) {
  const { onChange } = props;
  const localFieldValues = useMemo(() => getLocalData(STORE_KEYS.Fields), []);

  const [fieldValues, setFieldValues] = useState<any>(
    getLocalData(STORE_KEYS.Fields)
  );
  const [isMetroCity, setIsMetroCity] = useState<boolean>(
    localFieldValues[HRAFieldsEnum.isMetroCity] || false
  );
  const [rentPaid, setRentPaid] = useState<number>(
    localFieldValues[HRAFieldsEnum.rentPaid] || 0
  );

  const { baseAmount = 0, hraAmount = 0 } = props;

  const hra = useMemo(() => {
    return new HRA(
      Number(baseAmount),
      Number(hraAmount),
      rentPaid * 12,
      isMetroCity
    );
  }, [baseAmount, hraAmount, isMetroCity, rentPaid]);

  const [totalExemptions, setTotalExemptions] = useState<number>(0);

  EXEMPTIONS.sort((a, b) => {
    const aValue = Number(localFieldValues[a.title]) || Number(a.value) || 0;
    const bValue = Number(localFieldValues[b.title]) || Number(b.value) || 0;
    return bValue - aValue;
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const changeField = (field: string, value: number | string | boolean) => {
    setFieldValues((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const totalExemptions =
      sum(Object.values(fieldValues)) +
      STANDARD_DEDUCTION +
      hra.calcaulteMaxHRA();

    setTotalExemptions(totalExemptions);
    onChange(totalExemptions);

    setLocalData(STORE_KEYS.Fields, fieldValues);
  }, [fieldValues, hra, onChange]);

  return (
    <div className="flex-1 px-3">
      <div className="mx-auto mt-10 overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="flex font-bold text-xs text-white uppercase bg-orange-600 ">
          <div className="py-3 px-6">Exemptions & Deductions</div>
          <div className="ml-auto text-right py-3 px-6 pr-8">
            {currencyFormat(totalExemptions)}
          </div>
        </div>
      </div>
      <div className="w-full border mx-auto mt-2 overflow-x-auto relative shadow-md sm:rounded-lg">
        <table
          style={{
            tableLayout: "fixed",
          }}
          className="w-full text-sm text-left text-gray-500"
        >
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
            <FieldRow>
              <TableCell bold>
                <Details title={"HRA"} desc="Rent per month" />
              </TableCell>
              <TableCell>
                <Toggle
                  label="Is Metro?"
                  isEnabled={isMetroCity}
                  onChange={() => {
                    changeField("isMetroCity", !isMetroCity);
                    setIsMetroCity(!isMetroCity);
                  }}
                />
              </TableCell>
              <TableCell>
                <>
                  <Input
                    value={rentPaid}
                    isValid={(newValue: number) => {
                      newValue = Number(newValue) || 0;
                      if (newValue < 0) {
                        return false;
                      }
                      return true;
                    }}
                    onChange={(e) => {
                      const tmpRent = Number(e.target.value);
                      changeField("rentPaid", tmpRent || 0);
                      setRentPaid(tmpRent || 0);
                    }}
                  />
                  <span>Total: {currencyFormat(rentPaid * 12 || 0)}</span>
                  <ProgressBar
                    current={hra.A_10perBaseAndDa}
                    max={hra.getMinAC()}
                  />
                  {hra.A_10perBaseAndDa} -{hra.getMinAC()}
                </>
              </TableCell>
            </FieldRow>
            <FieldRow className={`${hra.current === 0 ? "bg-green-200" : ""}`}>
              <TableCell className="text-right">
                {hra.current === 0 && "✓"}
              </TableCell>
              <TableCell className="text-right">
                House Rent Paid - 10% of Basic + DA
              </TableCell>
              <TableCell className="text-center">
                {currencyFormat(hra.A_10perBaseAndDa)}
              </TableCell>
            </FieldRow>
            <FieldRow className={`${hra.current === 1 ? "bg-green-200" : ""}`}>
              <TableCell className="text-right">
                {hra.current === 1 && "✓"}
              </TableCell>
              <TableCell className="text-right">
                {isMetroCity ? 50 : 40}% of Basic + DA in
                {isMetroCity ? "" : " Non "} Metros
              </TableCell>
              <TableCell className="text-center">
                {currencyFormat(hra.B_50PerBaseAndDA)}
              </TableCell>
            </FieldRow>
            <FieldRow className={`${hra.current === 2 ? "bg-green-200" : ""}`}>
              <TableCell className="text-right">
                {hra.current === 2 && "✓"}
              </TableCell>
              <TableCell className="text-right">HRA Received</TableCell>
              <TableCell className="text-center">
                {currencyFormat(hra.C_HRAReceived)}
              </TableCell>
            </FieldRow>
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
                        defaultValue={fieldValues[title] ?? ""}
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
                      <ProgressBar
                        current={fieldValues[title] ?? value}
                        max={max}
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
