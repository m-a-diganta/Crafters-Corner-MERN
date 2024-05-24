import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../shared/context/auth-context";
import Input from "../../shared/components/FormElements/Input";

// import "./UpdateCourse.css";

const UpdateCourse = () => {
  const auth = useContext(AuthContext);
  const [loadedCourse, setLoadedCourse] = useState();
  const cid = useParams().cid;

  const [formContent, setFormContent] = useState({
    price: "",
  });

  const inputHandler = (id, value) => {
    setFormContent({ ...formContent, [id]: value });
  };

  const fetchCourse = async () => {
    try {
      const responseData = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/courses/${cid}`
      );

      setLoadedCourse(responseData.data.course);
      setFormContent({
        price: responseData.data.course.price,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();

  const courseUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { price } = formContent;
      const updatedData = { price };

      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/courses/${cid}`,
        updatedData
      );
      navigate(`/course/${cid}`, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

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
              <form onSubmit={courseUpdateSubmitHandler}>
                <div className="course-info-column">
                  <h1>{loadedCourse.title}</h1>
                  <div className="price-edit-box">
                    <div className="price-edit-input">
                      <Input
                        element="input"
                        id="price"
                        type="number"
                        onInput={inputHandler}
                        defaultValue={formContent.price}
                      />
                    </div>
                    <h3>/- BDT</h3>
                  </div>
                  <div className="course-info-column__buttons">
                    {auth.userId === loadedCourse.seller && (
                      <>
                        <button type="submit">UPDATE</button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default UpdateCourse;
