import React from "react";
import "./App.css";
import AutoComplete from "./components/auto-complete/AutoComplete";
import data from "./data/data.json";

function App() {
  return (
    <div className="app">
      <AutoComplete query="" suggestions={data.options} />
    </div>
  );
}

export default App;
