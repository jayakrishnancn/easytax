import { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import ConfirmLoadOldDataFromLocalStorage from "./components/ConfirmLoadOldDataFromLocalStorage";
import Compare from "./screen/Compare";
import Tabs from "./screen/Tabs";
import { clearDetailedExemption } from "./store/reducers/detailedExemptionsReducer";
import { clearExemptionData } from "./store/reducers/exemptionsReducer";
import { clearIncomeData } from "./store/reducers/incomeReducer";

function App() {
  const hasPreviousDataInLocalStorage = localStorage && JSON.stringify(localStorage).length > 10
  const [showSplashScreen, setShowSplashScreen] = useState( hasPreviousDataInLocalStorage);
  const dispatch = useDispatch();

  const handleClose = () => {
    localStorage.clear();
    dispatch(clearExemptionData());
    dispatch(clearIncomeData());
    dispatch(clearDetailedExemption());
    setShowSplashScreen(false);
  };
  const handleConfirm = () => {
    setShowSplashScreen(false);
  };

  return (
    <div className="App">
      <h1 className="text-center mt-2 mb-5 font-extrabold tracking-tight leading-none text-gray-900 text-4xl">
        Simple Tax
      </h1>
      {showSplashScreen ? (
        <ConfirmLoadOldDataFromLocalStorage
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      ) : (
        <div>
          <Compare />
          <Tabs />
        </div>
      )}
      <div className="text-center text-gray-400 text-sm font-light">
        v.{process.env.REACT_APP_GIT_SHA}
      </div>
    </div>
  );
}

export default App;
