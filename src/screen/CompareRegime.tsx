import { useMemo } from "react";
import calculateTaxNewRegime from "../util/calculations/new";
import calculateTaxOldRegime from "../util/calculations/old";
import { currencyFormat } from "../util/currencyFormat";
interface Props {
  income: number;
  exemptions: number;
}
function CompareRegime(props: Props) {
  const { income, exemptions } = props;
  const taxAsPerOldRegime = useMemo(
    () => calculateTaxOldRegime(income - exemptions),
    [income, exemptions]
  );
  const taxAsPerNewRegime = useMemo(
    () => calculateTaxNewRegime(income),
    [income]
  );

  return (
    <div className="flex justify-center gap-10 py-3">
      <div className="p-3 border w-64  bg-orange-600 font-bold text-white rounded">
        <h1>Old Regime</h1>

        {currencyFormat(taxAsPerOldRegime)}
      </div>
      <div className="p-3 border w-64  bg-green-600 font-bold text-white rounded">
        <h1>New Regime</h1>
        {currencyFormat(taxAsPerNewRegime)}
      </div>
    </div>
  );
}
export default CompareRegime;
