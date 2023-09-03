import React, { useState } from "react";
import "./AutoComplete.css";

type TAutoComplete = {
  query: string;
  suggestions: TSuggestion[];
  maxSuggestionsToShow?: number;
};

type TSuggestion = {
  id: number;
  value: string;
};

const filterSuggestions: (args: TAutoComplete) => TSuggestion[] = (args) =>
  !!args.query
    ? args.suggestions.filter((s) =>
        new RegExp(`^${args.query}`, "i").test(s.value)
      )
    : [];

const AutoComplete: React.FC<TAutoComplete> = ({
  maxSuggestionsToShow = 10,
  ...props
}) => {
  const [query, setQuery] = useState(props.query);
  const [suggestions, setSuggestions] = useState<TSuggestion[]>(
    filterSuggestions({ query: props.query, suggestions: props.suggestions })
  );

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newQuery = e.target.value.trimStart();
    setQuery(newQuery);
    setSuggestions(
      filterSuggestions({ query: newQuery, suggestions: props.suggestions })
    );
  };

  return (
    <div className="auto-complete">
      <input
        className="query"
        placeholder="Search Users"
        value={query}
        autoFocus
        onChange={onChange}
      />
      {!!query && suggestions.length === 0 && (
        <span className="validation-info">No matches found</span>
      )}
      <ul className="suggestion-list">
        {suggestions.slice(0, maxSuggestionsToShow).map((s) => (
          <li className="suggestion" key={s.id}>
            <strong>{s.value.substring(0, query.length)}</strong>
            {s.value.substring(query.length)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoComplete;
