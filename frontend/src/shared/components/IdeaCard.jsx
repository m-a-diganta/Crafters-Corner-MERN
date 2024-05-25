import React from "react";

import "./IdeaCard.css";

const IdeaCard = (props) => {
  return (
    <div className="idea-card__box">
      <div className="idea-card-title__container">
        <div className="idea-card-title-image__container">
          <div className="idea-card-title-image__box">
            <img src={`${import.meta.env.VITE_REACT_APP_ASSET_URL}/${
            props.item.postedBy.image
          }`} alt="" />
          </div>
        </div>
        <div className="idea-card-title-text__container">
          {props.item.title}
        </div>
      </div>
      <div className="idea-card-content__container">
      {props.item.description}
      </div>
    </div>
  );
};

export default IdeaCard;
