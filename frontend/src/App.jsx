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

axios.defaults.withCredentials = true;

function App() {
  const { userId, username, role, isLoggedIn, login, logout } = useAuth();

  let routes;
  if (isLoggedIn) {
    if (role === "seller") {
      routes = (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/services" element={<Temp />}></Route>
          <Route path="/store" element={<Temp />}></Route>
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
