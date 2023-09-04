import "./App.css";
import AutoComplete from "./components/auto-complete/AutoComplete";
// Note: Uncomment to fetch local data instead of API
// import data from "./data/data.json";

export type TSuggestion = {
  id: number;
  value: string;
};

type TAPIResponse = TSuggestion[];

export type TFilterSuggestions = (query: string) => Promise<TSuggestion[]>;

const filterSuggestions: TFilterSuggestions = async (query) => {
  if (!query) return [];
  // Fetch API the result is sorted in the server before sending
  const response = await fetch(
    `https://us-central1-rahulramesh12.cloudfunctions.net/autoComplete?query=${query}`
  );
  const respJson = (await response.json()) as TAPIResponse;
  const suggestions = respJson || [];
  // Note: Uncomment the below line and comment the above code set of lines fetching the data
  // const suggestions = data.options;
  return suggestions;
};

function App() {
  return (
    <div className="app">
      <AutoComplete filterSuggestions={filterSuggestions} />
    </div>
  );
}

export default App;
