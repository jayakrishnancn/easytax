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
  const [taxInOldRegime, setTaxInOldRegime] = useState<number>(0);
  const [taxInNewRegime, setTaxInNewRegime] = useState<number>(0);
  const [saveAmount, setSaveAmount] = useState<string>("0");
  useEffect(() => {
    const totalIncome = calculateTotalIncome(income);
    const totalExemptions = calculateTotalExemptions(exemptions);
    const _old = calculateTaxOldRegime(totalIncome - totalExemptions);
    const _new = calculateTaxNewRegime(totalIncome);
    setTaxInOldRegime(_old);
    setTaxInNewRegime(_new);

    setSaveAmount(currencyFormat(Math.abs(_new - _old)));
  }, [exemptions, income]);
  const tick = (
    <div className="-top-2 -right-2 absolute ">
      <Tick />
    </div>
  );

  let betterId = 0;
  if (taxInOldRegime !== taxInNewRegime) {
    betterId = taxInOldRegime < taxInNewRegime ? 1 : 2;
  }
  const tabs = [
    { title: "Tax as per old regime", tax: taxInOldRegime, id: 1 },
    { title: "Tax as per new regime", tax: taxInNewRegime, id: 2 },
  ];

  return (
    <div className="h-28 text-center flex justify-center mt-4 mb-4 max-w-lg mx-auto">
      {tabs.map(({ title, tax, id }) => (
        <div
          key={title}
          className={
            "mx-2 flex-1 font-normal align-middle justify-center flex flex-col relative border-2 p-3 rounded " +
            (betterId === id ? "bg-green-100 border-green-400" : "bg-gray-100")
          }
        >
          <div>{title}</div>
          <div aria-label={title}>{currencyFormat(tax)}</div>
          {betterId === id && (
            <>
              {tick}
              <div
                aria-label={`save amount using ${title}`}
                className="left-2 w-11/12  absolute -bottom-4 bg-green-600 text-white rounded p-2"
              >
                Save {saveAmount}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Compare;
