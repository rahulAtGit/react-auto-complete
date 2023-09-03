import React from "react";
import { TSuggestion } from "../../App";
import { TOnSuggestionClick } from "./useAutoComplete";

export const SuggestionList: React.FC<{
  suggestions: TSuggestion[];
  query: string;
  onSuggestionClick: TOnSuggestionClick;
  activeIndex: number;
}> = (props) => {
  return (
    <ul className="suggestion-list">
      {props.suggestions.map((s, index) => (
        <li
          className={`suggestion ${
            index === props.activeIndex ? "suggestion--active" : ""
          }`}
          key={s.id}
          onClick={() => props.onSuggestionClick(s.id)}
        >
          <strong>{s.value.substring(0, props.query.length)}</strong>
          {s.value.substring(props.query.length)}
        </li>
      ))}
    </ul>
  );
};
