import "./App.css";
import Compare from "./screen/Compare";
import Tabs from "./screen/Tabs";

function App() {
  return (
    <div className="App">
      <h1 className="text-center mt-2 mb-5 font-extrabold tracking-tight leading-none text-gray-900 text-4xl">
        Simple Tax
      </h1>
      <Compare />
      <Tabs />
      <div className="text-center text-gray-400 text-sm font-light">
        v.{process.env.REACT_APP_GIT_SHA}
      </div>
    </div>
  );
}

export default App;
