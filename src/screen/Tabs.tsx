import { useState } from "react";
import { useDispatch } from "react-redux";
import Select from "../components/Select";
import {
  getDetailedExemptionData,
  getExemptionData,
} from "../services/exemptions";
import { getIncomeData } from "../services/income";
import { resetDeailedExemptions } from "../store/reducers/detailedExemptionsReducer";
import { resetExemptions } from "../store/reducers/exemptionsReducer";
import { resetIncome } from "../store/reducers/incomeReducer";
import { loadYear } from "../store/reducers/taxYearReducer";
import { FORMATTED_FY, getAllFY } from "../util/calender";
import ExemptionsTab from "./ExemptionsTab";
import IncomeTab from "./IncomeTab";

function Tabs() {
  const AVAILABLE_AY = getAllFY().map((year) => ({ value: year }));

  const dispatch = useDispatch();

  const [tab, setTab] = useState<number>(0);
  const handleYearChange = (value: string) => {
    const newIncomeData = getIncomeData(value);
    const newExemptionsData = getExemptionData(value);
    const newDetailedExemptionsData = getDetailedExemptionData(value);

    dispatch(loadYear(value));
    dispatch(resetIncome(newIncomeData));
    dispatch(resetExemptions(newExemptionsData));
    dispatch(resetDeailedExemptions(newDetailedExemptionsData));
  };

  return (
    <>
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
            <Select
              defaultValue={FORMATTED_FY}
              values={AVAILABLE_AY}
              onChange={handleYearChange}
            />
          </li>
        </ul>
      </div>
      <div className="mt-2 max-w-xl mx-auto flex justify-around align-top ">
        {tab === 0 && <IncomeTab />}
        {tab === 1 && <ExemptionsTab />}
      </div>
    </>
  );
}
export default Tabs;
