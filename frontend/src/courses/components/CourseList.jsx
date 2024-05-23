import React from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import "./CourseList.css";

const CourseList = (props) => {
  return (
    <div className="center">
      <ul className="course-list-box">
        {props.items.map((item) => (
          <li key={item.id}>
            <Link to={`/course/${item.id}`}>
              <CourseCard item={item} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
