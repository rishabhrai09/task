import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FlavanoidsStatsComponent from "./FalvanoidsState";
import GammaTable from "./GammaCode";

function App() {
  return (
    <div className="App">
      <FlavanoidsStatsComponent />
      <GammaTable />
    </div>
  );
}

export default App;
