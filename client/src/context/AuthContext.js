import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authToken}`;
      // Fetch user data if needed
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get("/user");
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      };
      fetchUser();
    }
  }, [authToken]);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      setAuthToken(response.data.token);
      localStorage.setItem("authToken", response.data.token);
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  const register = async (email, password) => {
    try {
      await axiosInstance.post("/auth/register", { email, password });
    } catch (error) {
      console.error("Failed to register", error);
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    axiosInstance.defaults.headers.common["Authorization"] = "";
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
