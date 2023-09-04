import React, { useEffect } from "react";
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
    keyUpEvents,
    activeIndex,
  } = useAutoComplete(filterSuggestions, initialQuery, maxSuggestionsToShow);

  useEffect(() => {
    console.log("suggestions", suggestions);
  }, [suggestions]);

  return (
    <div className="auto-complete">
      <div className="input-loader-wrapper">
        <input
          className="query"
          placeholder="Search Users"
          value={query}
          autoFocus
          onChange={onChange}
          onKeyUp={keyUpEvents}
        />
        {isLoading && <div className="loader" />}
      </div>
      {showNoMatch && (
        <span className="input-label no-match">No matches found</span>
      )}
      {!!suggestions.length && (
        <span className="input-label info-guide">
          Click or Use Arrows to select and Press Enter
        </span>
      )}
      {!isLoading && (
        <SuggestionList
          suggestions={suggestions}
          query={query}
          onSuggestionClick={onSuggestionClick}
          activeIndex={activeIndex}
        />
      )}
    </div>
  );
};

export default AutoComplete;
