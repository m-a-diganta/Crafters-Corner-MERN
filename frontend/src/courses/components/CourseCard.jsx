import React from "react";
import "./CourseCard.css";

const CourseCard = (props) => {
  return (
    <main className="course-card-box">
      <div className="course-card-image">
        <img
          src={`${import.meta.env.VITE_REACT_APP_ASSET_URL}/${props.item.image}`}
          alt={props.item.title}
        />
      </div>
      <div className="course-card-info">
        <h4>{props.item.title}</h4>
        <p>{props.item.description}</p>
        <h5>{props.item.price} BDT</h5>
        <p>Category: {props.item.category}</p>
      </div>
      <button type="button">ENROLL NOW</button>
    </main>
  );
};

export default CourseCard;
