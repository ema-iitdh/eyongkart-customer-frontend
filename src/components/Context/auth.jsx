import React, { useState, useEffect } from "react";
import { createContext } from "react";
import instance from "../../../api";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState({
    message: "",
    token: "",
  });

  const contextValue = {
    auth,
  };

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
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
