import React from "react";

import { Link } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-box center">
      <Link to="/seller/products">View Products</Link>
      <Link to="/seller/add-product">Add Product</Link>
    </div>
  );
};

export default Dashboard;
