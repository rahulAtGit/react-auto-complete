import React from "react";
import { TSuggestion } from "../../App";

export const SuggestionList: React.FC<{
  suggestions: TSuggestion[];
  query: string;
}> = (props) => {
  return (
    <ul className="suggestion-list">
      {props.suggestions.map((s) => (
        <li className="suggestion" key={s.id}>
          <strong>{s.value.substring(0, props.query.length)}</strong>
          {s.value.substring(props.query.length)}
        </li>
      ))}
    </ul>
  );
};
