import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
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
  onSuggestionClick: TOnSuggestionClick;
  keyUpEvents: React.KeyboardEventHandler<HTMLInputElement>;
  activeIndex: number;
};

export type TOnSuggestionClick = (id: number) => void;

export const useAutoComplete: TUseAutoComplete = (
  filterSuggestions,
  initialQuery,
  maxSuggestionsToShow = 10
) => {
  const [query, setQuery] = useState(initialQuery || "");
  const [suggestions, setSuggestions] = useState<TSuggestion[]>([]);
  const [noMatch, setNoMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const fetchNew = async (newQuery: string) => {
    const updated = await filterSuggestions(newQuery);
    setIsLoading(false);
    setSuggestions(updated.slice(0, maxSuggestionsToShow));
    setNoMatch(!!newQuery && !updated.length);
  };

  //useCallback is used to prevent rerender
  const debounsedCallback = useCallback(debounce(fetchNew), []);

  useEffect(() => {
    if (!!query) {
      setIsLoading(true);
      setActiveIndex(-1);
      debounsedCallback(query);
    } else {
      setActiveIndex(-1);
      setSuggestions([]);
      setNoMatch(false);
    }
  }, [query]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const newQuery = e.target.value.trimStart();
    setQuery(newQuery);
  };

  const onSuggestionClick: TOnSuggestionClick = (id) => {
    const clickedItem = suggestions.find((s) => s.id === id);
    if (!!clickedItem) {
      setQuery(clickedItem.value);
    }
  };

  const keyUpEvents: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    switch (e.code) {
      case "ArrowUp": {
        setActiveIndex(
          (activeIndex) =>
            (activeIndex - 1 + suggestions.length) % suggestions.length
        );
        break;
      }
      case "ArrowDown": {
        setActiveIndex((activeIndex) => (activeIndex + 1) % suggestions.length);
        break;
      }
      case "Enter": {
        setQuery(suggestions[activeIndex].value);
        break;
      }
    }
  };

  return {
    query,
    onChange,
    showNoMatch: noMatch && !isLoading,
    isLoading,
    suggestions,
    onSuggestionClick,
    keyUpEvents,
    activeIndex,
  };
};
