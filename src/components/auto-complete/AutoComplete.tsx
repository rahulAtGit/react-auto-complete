import React from "react";
import { TFilterSuggestions } from "../../App";
import "./AutoComplete.css";
import { SuggestionList } from "./SuggestionList";
import { useAutoComplete } from "./useAutoComplete";

export type TAutoComplete = {
  filterSuggestions: TFilterSuggestions;
  initialQuery?: string;
  maxSuggestionsToShow?: number;
};

const AutoComplete: React.FC<TAutoComplete> = ({
  filterSuggestions,
  initialQuery,
  maxSuggestionsToShow,
}) => {
  const {
    query,
    onChange,
    showNoMatch,
    isLoading,
    suggestions,
    onSuggestionClick,
  } = useAutoComplete(filterSuggestions, initialQuery, maxSuggestionsToShow);

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
      {showNoMatch && <span className="validation-info">No matches found</span>}
      {!isLoading && (
        <SuggestionList
          suggestions={suggestions}
          query={query}
          onSuggestionClick={onSuggestionClick}
        />
      )}
    </div>
  );
};

export default AutoComplete;
