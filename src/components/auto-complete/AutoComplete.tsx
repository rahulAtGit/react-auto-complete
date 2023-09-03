import React, { useCallback, useState } from "react";
import "./AutoComplete.css";
import { TFilterSuggestions } from "../../App";

export type TAutoComplete = {
  query?: string;
  filterSuggestions: TFilterSuggestions;
  maxSuggestionsToShow?: number;
};

export type TSuggestion = {
  id: number;
  value: string;
};

const debounce = (callback: Function, timeout = 500) => {
  let timer: NodeJS.Timeout | null;
  const self = this;
  return function (...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback.apply(self, args);
    }, timeout);
  };
};

const AutoComplete: React.FC<TAutoComplete> = ({
  maxSuggestionsToShow = 10,
  ...props
}) => {
  const [query, setQuery] = useState(props.query || "");
  const [suggestions, setSuggestions] = useState<TSuggestion[]>([]);
  const [noMatch, setNoMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNew = async (newQuery: string) => {
    console.log("sdfkjh");
    const updated = await props.filterSuggestions(newQuery);
    setIsLoading(false);
    setSuggestions(updated);
    setNoMatch(!!newQuery && !updated.length);
  };

  const debounsedCallback = useCallback(debounce(fetchNew), []);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const newQuery = e.target.value.trimStart();
    setQuery(newQuery);
    setIsLoading(true);
    debounsedCallback(newQuery);
  };

  return (
    <div className="auto-complete">
      <div className="input-loader-wrapper">
        <input
          className="query"
          placeholder="Search Users"
          value={query}
          autoFocus
          onChange={onChange}
        />
        {isLoading && <div className="loader" />}
      </div>
      {!isLoading && (
        <>
          {noMatch && <span className="validation-info">No matches found</span>}
          <ul className="suggestion-list">
            {suggestions.slice(0, maxSuggestionsToShow).map((s) => (
              <li className="suggestion" key={s.id}>
                <strong>{s.value.substring(0, query.length)}</strong>
                {s.value.substring(query.length)}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AutoComplete;
