import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { STANDARD_DEDUCTION } from "./constants/exemptionsFields";
import { HRAFieldsEnum, STORE_KEYS } from "./enums/exemptions";
import CompareRegime from "./screen/CompareRegime";
import Exemptions from "./screen/Exemptions";
import IncomeTab from "./screen/IncomeTab";
import { sum } from "./util/arrayUtil";
import HRA from "./util/calculations/hra";
import { getLocalData } from "./util/localStorage";

function App() {
  const [tab, setTab] = useState<number>(0);
  const [income, setIncomeChange] = useState<number>(0);
  const [salary, setSalary] = useState({
    baseAmount: 0,
    hraAmount: 0,
  });
  const localFieldValues = useMemo(() => getLocalData(STORE_KEYS.Fields), []);

  const [exemptions, setExemptionsChange] = useState<number>(0);

  useEffect(() => {
    let total =
      sum(Object.values(localFieldValues)) +
      STANDARD_DEDUCTION +
      new HRA(
        salary.baseAmount,
        salary.hraAmount,
        localFieldValues[HRAFieldsEnum.rentPaid] * 12 || 0,
        !!localFieldValues[HRAFieldsEnum.isMetroCity]
      ).calcaulteMaxHRA();

    setExemptionsChange(total);
  }, [localFieldValues, salary.baseAmount, salary.hraAmount]);

  console.log(localFieldValues, "local");
  const activeClass =
    " text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500";
  const inActiveClass =
    "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700";

  return (
    <div className="App">
      <CompareRegime income={income} exemptions={exemptions} />
      <div className=" max-w-xl mx-auto  border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block p-4 rounded-t-lg border-b-2 ${
                tab === 0 ? activeClass : inActiveClass
              }`}
              onClick={() => setTab(0)}
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="true"
            >
              Income
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block p-4 rounded-t-lg border-b-2 ${
                tab === 1 ? activeClass : inActiveClass
              }`}
              onClick={() => setTab(1)}
              id="dashboard-tab"
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
            >
              Exemptions & Deductions
            </button>
          </li>
        </ul>
      </div>
      <div className=" max-w-xl mx-auto flex justify-around align-top ">
        {tab === 0 && (
          <IncomeTab setSalary={setSalary} onChange={setIncomeChange} />
        )}
        {tab === 1 && (
          <Exemptions
            defaultValues={localFieldValues}
            baseAmount={salary.baseAmount}
            hraAmount={salary.hraAmount}
            onChange={setExemptionsChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;
