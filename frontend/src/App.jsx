import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import MainNavigation from "./shared/components/UIElements/MainNavigation";
import Temp from "./Temp";
import Test from "./Test";
import { useAuth } from "./shared/hooks/auth-hook";
import Login from "./user/pages/Login";
import Signup from "./user/pages/Signup";

function App() {
  const { userId, userType, isLoggedIn, login, logout } = useAuth;

  return (
    <>
      <Router>
        <MainNavigation />
        <main className="main">
          <Routes>
            <Route path="/" element={<Test />}></Route>
            <Route path="/services" element={<Temp />}></Route>
            <Route path="/store" element={<Temp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
