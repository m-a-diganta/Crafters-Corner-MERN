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

  return <>{loadedCourses && <CourseList items={loadedCourses} />}</>;
};

export default SellerCourses;
