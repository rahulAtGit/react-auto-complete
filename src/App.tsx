import "./App.css";
import AutoComplete from "./components/auto-complete/AutoComplete";
// Note: Uncomment to fetch local data instead of API
// import data from "./data/data.json";

export type TSuggestion = {
  id: number;
  value: string;
};

type TAPIResponse = {
  options: TSuggestion[];
};

export type TFilterSuggestions = (query: string) => Promise<TSuggestion[]>;

const filterSuggestions: TFilterSuggestions = async (query) => {
  // Fetch API the result is sorted in the server before sending
  const response = await fetch(
    "https://mocki.io/v1/25b3fa0b-0d06-4a1d-90e3-a0f0ad74ffce"
  );
  const respJson = !!query && ((await response.json()) as TAPIResponse);
  const suggestions = (!!respJson && respJson?.options) || [];
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
