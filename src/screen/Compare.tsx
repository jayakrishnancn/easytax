import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tick from "../components/Tick";
import { RootState } from "../store";
import { calculateTotalExemptions } from "../util/calculations/exemptionUtils";
import calculateTaxNewRegime from "../util/calculations/new";
import calculateTaxOldRegime from "../util/calculations/old";
import { currencyFormat } from "../util/currencyFormat";
import { calculateTotalIncome } from "../util/incomeUtils";

function Compare() {
  const income = useSelector((store: RootState) => store.income);
  const exemptions = useSelector((store: RootState) => store.exemptions);
  const [taxInOldRegime, setTaxInOldRegime] = useState<string>("0");
  const [taxInNewRegime, setTaxInNewRegime] = useState<string>("0");
  const [saveAmount, setSaveAmount] = useState<string>("0");
  useEffect(() => {
    const totalIncome = calculateTotalIncome(income);
    const totalExemptions = calculateTotalExemptions(exemptions);
    const _old = calculateTaxOldRegime(totalIncome - totalExemptions);
    const _new = calculateTaxNewRegime(totalIncome);
    setTaxInOldRegime(currencyFormat(_old));
    setTaxInNewRegime(currencyFormat(_new));

    setSaveAmount(currencyFormat(Math.abs(_new - _old)));
  }, [exemptions, income]);
  const tick = (
    <div className="-top-2 -right-2 absolute ">
      <Tick />
    </div>
  );
  const better = taxInOldRegime < taxInNewRegime ? 1 : 2;

  return (
    <div className="text-center flex justify-center mt-4 max-w-lg mx-auto">
      <div
        className={
          "mx-2 flex-1 font-normal align-middle justify-center flex flex-col relative border p-3 rounded " +
          (better === 1 ? "bg-green-100 border-green-400" : "bg-gray-100")
        }
      >
        <div>Tax as per Old Regime:</div>
        <div className="mb-2"> {taxInOldRegime}</div>
        {better === 1 && (
          <div className="bg-green-600 text-white rounded p-2">
            Save {saveAmount} {tick}
          </div>
        )}
      </div>

      <div
        className={
          "mx-2 flex-1 font-normal align-middle justify-center flex flex-col relative border p-3 rounded " +
          (better === 2 ? "bg-green-100 border-green-400" : "bg-gray-100")
        }
      >
        <div>Tax as per New Regime:</div>
        <div className="mb-2">{taxInNewRegime}</div>
        {better === 2 && (
          <div className="bg-green-600 text-white rounded p-2">
            Save {saveAmount} {tick}
          </div>
        )}
      </div>
    </div>
  );
}

export default Compare;
