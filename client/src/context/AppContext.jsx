import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Configure axios baseURL
  axios.defaults.baseURL =
    import.meta.env.VITE_API_URL || "http://localhost:8000";

  // Set up axios interceptor for token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Check token validity on app load
  useEffect(() => {
    const checkTokenValidity = () => {
      const storedToken = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      const userData = localStorage.getItem("user");

      if (storedToken && tokenExpiry && userData) {
        const now = new Date().getTime();
        const expiryTime = parseInt(tokenExpiry);

        if (now < expiryTime) {
          setToken(storedToken);
          setUser(JSON.parse(userData));
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;
        } else {
          // Token expired, clear everything
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiry");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
          delete axios.defaults.headers.common["Authorization"];
        }
      }
    };

    checkTokenValidity();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  const value = {
    token,
    setToken,
    user,
    setUser,
    navigate,
    axios,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
