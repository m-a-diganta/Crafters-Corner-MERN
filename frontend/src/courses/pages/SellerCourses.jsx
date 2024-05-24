import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "../../shared/context/auth-context";
import CourseList from "../components/CourseList";

const SellerCourses = () => {
  const auth = useContext(AuthContext);
  const [loadedCourses, setLoadedCourses] = useState();

  const fetchCourses = async () => {
    try {
      const responseData = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }/courses/sellercourses/${auth.userId}`
      );

      setLoadedCourses(responseData.data.courses);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return <div className="page_container">
    <div className="seller-course-page_box">
    <h1 className="course-headline">Courses: {auth.username}</h1>
    <div className="h-line"></div>
    <div className="course_container">
      {loadedCourses && <CourseList items={loadedCourses} />}
    </div>
  </div>
</div>
};

export default SellerCourses;
