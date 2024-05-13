import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  username: null,
  userImage: null,
  role: null,
  login: () => {},
  logout: () => {},
});
