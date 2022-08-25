import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Select from "./components/Select";
import Compare from "./screen/Compare";
import ExemptionsTab from "./screen/Exemptions";
import IncomeTab from "./screen/IncomeTab";
import { getExemptionData } from "./services/exemptions";
import { getIncomeData } from "./services/income";
import { resetExemptions } from "./store/reducers/exemptionsReducer";
import { resetIncome } from "./store/reducers/incomeReducer";
import { getAllFY } from "./util/calender";

function App() {
  const [tab, setTab] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetIncome(getIncomeData()));
    dispatch(resetExemptions(getExemptionData()));
  }, [dispatch]);

  const handleYearChange = (value: string) => {};
  const AVAILABLE_AY = getAllFY().map((year) => ({ value: year }));
  return (
    <div className="App">
      <h1 className="mt-2 mb-5 font-extrabold tracking-tight leading-none text-gray-900 text-4xl">
        Simple Tax
      </h1>
      <Compare />
      <div className="mt-2 max-w-xl mx-auto  border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block p-4 rounded-t-lg border-b-2 ${
                tab === 0 ? "active-tab" : "inactive-tab"
              }`}
              onClick={() => setTab(0)}
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
                tab === 1 ? "active-tab" : "inactive-tab"
              }`}
              onClick={() => setTab(1)}
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
            >
              Exemptions & Deductions
            </button>
          </li>
          <li
            className="ml-auto flex justify-center items-center"
            role="presentation"
          >
            <Select values={AVAILABLE_AY} onChange={handleYearChange} />
          </li>
        </ul>
      </div>
      <div className="mt-2 max-w-xl mx-auto flex justify-around align-top ">
        {tab === 0 && <IncomeTab />}
        {tab === 1 && <ExemptionsTab />}
      </div>
    </div>
  );
}

export default App;
