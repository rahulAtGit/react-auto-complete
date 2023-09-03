import React, { ChangeEventHandler, useCallback, useState } from "react";
import { TFilterSuggestions, TSuggestion } from "../../App";
import { debounce } from "../../utils/debounce";
import "./AutoComplete.css";

type TUseAutoComplete = (
  filterSuggestions: TFilterSuggestions,
  initialQuery?: string,
  maxSuggestionsToShow?: number
) => {
  query: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  showNoMatch: boolean;
  isLoading: boolean;
  suggestions: TSuggestion[];
};

export const useAutoComplete: TUseAutoComplete = (
  filterSuggestions,
  initialQuery,
  maxSuggestionsToShow = 10
) => {
  const [query, setQuery] = useState(initialQuery || "");
  const [suggestions, setSuggestions] = useState<TSuggestion[]>([]);
  const [noMatch, setNoMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNew = async (newQuery: string) => {
    const updated = await filterSuggestions(newQuery);
    setIsLoading(false);
    setSuggestions(updated.slice(0, maxSuggestionsToShow));
    setNoMatch(!!newQuery && !updated.length);
  };

  //useCallback is used to prevent rerender
  const debounsedCallback = useCallback(debounce(fetchNew), []);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const newQuery = e.target.value.trimStart();
    setQuery(newQuery);
    setIsLoading(true);
    debounsedCallback(newQuery);
  };

  return {
    query,
    onChange,
    showNoMatch: noMatch && !isLoading,
    isLoading,
    suggestions,
  };
};
