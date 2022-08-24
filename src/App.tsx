import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import IncomeTab from "./screen/IncomeTab";
import { getIncomeData } from "./services/income";
import { reset } from "./store/reducers/incomeReducer";

function App() {
  const [tab, setTab] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset(getIncomeData()));
  }, [dispatch]);

  return (
    <div className="App">
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
        </ul>
      </div>
      <div className="mt-2 max-w-xl mx-auto flex justify-around align-top ">
        {tab === 0 && <IncomeTab />}
        {tab === 1 && <div>Two</div>}
      </div>
    </div>
  );
}

export default App;
