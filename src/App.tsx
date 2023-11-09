import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FlavanoidsStatsComponent from "./FalvanoidsState";
import GammaTable from "./GammaCode";

function App() {
  return (
    <div className="App">
      <FlavanoidsStatsComponent />
      <div style={{marginTop:"10px"}}></div>
      <GammaTable />
    </div>
  );
}

export default App;
