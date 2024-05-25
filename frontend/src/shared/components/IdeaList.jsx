import React from "react";

import "./IdeaList.css";
import IdeaCard from "./IdeaCard";

const IdeaList = (props) => {
  return (
    <ul className="idea-list-box">
      {props.items.map((item) => (
        <li key={item.id}>
          <IdeaCard item={item} />
        </li>
      ))}
    </ul>
  );
};

export default IdeaList;
