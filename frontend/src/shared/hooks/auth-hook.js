import React, { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const login = useCallback(() => {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const logout = useCallback(() => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
  }, []);

  // useEffect(() => {
  //   login();
  // }, [])

  return { userId, userType, isLoggedIn, login, logout };
};
