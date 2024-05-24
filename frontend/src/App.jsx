import { useState, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import "./App.css";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Temp from "./Temp";
import Test from "./Test";
import { useAuth } from "./shared/hooks/auth-hook";
import Login from "./user/pages/Login";
import Signup from "./user/pages/Signup";
import { AuthContext } from "./shared/context/auth-context";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import Home from "./shared/pages/Home";

// Seller Pages
import Dashboard from "./user/pages/seller/Dashboard";
import AddProduct from "./products/pages/AddProduct";
import SellerProducts from "./products/pages/SellerProducts";
import ProductItem from "./products/components/ProductItem";
import UpdateProduct from "./products/pages/UpdateProduct";

import AddCourse from "./courses/pages/AddCourse";
import SellerCourses from "./courses/pages/SellerCourses";
import CourseItem from "./courses/components/CourseItem";
import UpdateCourse from "./courses/pages/UpdateCourse";

axios.defaults.withCredentials = true;

function App() {
  const { userId, username, userImage, role, isLoggedIn, login, logout } =
    useAuth();

  let routes;
  if (isLoggedIn) {
    if (role === "seller") {
      routes = (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/services" element={<Temp />}></Route>
          <Route path="/store" element={<Temp />}></Route>
          <Route path="/product/:pid" element={<ProductItem />}></Route>
          <Route path="/seller/dashboard" element={<Dashboard />}></Route>
          <Route path="/seller/add-product" element={<AddProduct />}></Route>
          <Route path="/seller/products" element={<SellerProducts />}></Route>
          <Route path="/seller/add-course" element={<AddCourse />}></Route>
          <Route path="/seller/courses" element={<SellerCourses />}></Route>
          <Route path="/course/:cid" element={<CourseItem />}></Route>
          <Route
            path="/seller/product/:pid/edit"
            element={<UpdateProduct />}
          ></Route>
          <Route
            path="/seller/course/:cid/edit"
            element={<UpdateCourse />}
          ></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      );
    } else if (role === "customer") {
      routes = (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Temp />}></Route>
          <Route path="/order-history" element={<Temp />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      );
    }
  } else if (isLoggedIn !== null) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/check" element={<Temp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        username: username,
        userImage: userImage,
        role: role,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        {routes && <MainNavigation />}

        <main className="main">
          <Suspense
            fallback={
              <main className="center">
                <LoadingSpinner />
              </main>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
