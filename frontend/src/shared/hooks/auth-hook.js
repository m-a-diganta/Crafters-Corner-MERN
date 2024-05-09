import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const login = useCallback(() => {
    const loginFunction = async () => {
      try {
        const response = await axios.get("http://localhost:5000/loggedIn");
        setIsLoggedIn(response.data.verified);
        setUserId(response.data.userId);
        setUsername(response.data.username);
        setRole(response.data.role);
      } catch (err) {
        console.log(err);
      }
    };

    loginFunction();
  }, []);

  const logout = useCallback(async () => {
    await axios.get("http://localhost:5000/loggedOut");
    login();
  }, []);

  useEffect(() => {
    login();
  }, [login, isLoggedIn]);

  return { userId, username, role, isLoggedIn, login, logout };
};
