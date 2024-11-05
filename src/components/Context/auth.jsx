import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    message: "",
    token: "",
  });

  useEffect(() => {
    let isLogin = localStorage.getItem("auth");
    if (isLogin) {
      isLogin = JSON.parse(isLogin);
      setAuth({
        ...auth,
        message: isLogin.message,
        token: isLogin.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
// const useAuth = () => useContext(AuthContext);
export default AuthProvider;
