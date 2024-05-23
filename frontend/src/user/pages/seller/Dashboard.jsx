import React from "react";

import { Link } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="box-container">
      <div className="dashboard-box center">
        <Link to="/seller/products">View Products</Link>
        <Link to="/seller/add-product">Add Product</Link>
        <Link to="/seller/courses">View Courses</Link>
        <Link to="/seller/add-course">Add Course</Link>
      </div>
    </div>
  );
};

export default Dashboard;
