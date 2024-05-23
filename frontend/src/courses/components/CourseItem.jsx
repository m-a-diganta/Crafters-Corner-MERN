import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../shared/context/auth-context";
import "./CourseItem.css";

const CourseItem = () => {
  const auth = useContext(AuthContext);
  const [loadedCourse, setLoadedCourse] = useState();
  const { cid } = useParams();

  const fetchCourse = async () => {
    try {
      const responseData = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/courses/${cid}`
      );
      setLoadedCourse(responseData.data.course);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [cid]);

  return (
    <>
      {loadedCourse && (
        <div className="center">
          <main className="course-item-box">
            <div className="course-image-description-column">
              <div className="course-image-container">
                <div className="course-image-box">
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_ASSET_URL}/${loadedCourse.image}`}
                    alt="No image found"
                  />
                </div>
              </div>
              <div className="course-description-box">
                <h5>Description</h5>
                <p>{loadedCourse.description}</p>
              </div>
            </div>
            <div className="course-info-container">
              <div className="course-info-column">
                <h1>{loadedCourse.title}</h1>
                <h3>{loadedCourse.price} /- BDT</h3>
                <div className="course-info-column__buttons">
                  {auth.userId === loadedCourse.seller && (
                    <>
                      <Link
                        to={`/seller/course/${loadedCourse.id}/edit`}
                        className="edit-button"
                      >
                        EDIT
                      </Link>
                      <button type="button" className="delete-button">
                        DELETE
                      </button>
                    </>
                  )}
                  {auth.role === "customer" && (
                    <button type="button">ENROLL NOW</button>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default CourseItem;
