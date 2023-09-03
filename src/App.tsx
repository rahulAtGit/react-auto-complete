import React from "react";
import "./App.css";
import AutoComplete, {
  TSuggestion,
} from "./components/auto-complete/AutoComplete";
import data from "./data/data.json";

export type TFilterSuggestions = (query: string) => Promise<TSuggestion[]>;

const filterSuggestions: TFilterSuggestions = async (query) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const suggestions = data.options;
      resolve(
        !!query
          ? suggestions.filter((s) =>
              new RegExp(`^${query}`, "i").test(s.value)
            )
          : []
      );
    }, 1000);
  });

function App() {
  return (
    <div className="app">
      <AutoComplete filterSuggestions={filterSuggestions} />
    </div>
  );
}

export default App;
