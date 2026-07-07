import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [redirectPath, setRedirectPath] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("ss_logged_in") === "true";

    const savedUser = localStorage.getItem("ss_user");

    setIsLoggedIn(loggedIn);

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const openLogin = (path = null) => {
    setRedirectPath(path);

    setShowSignup(false);
    setShowLogin(true);
  };

  const openSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const closeAuth = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

const login = (userData = null) => {
  localStorage.setItem("ss_logged_in", "true");

  if (userData) {
    localStorage.setItem(
      "ss_user",
      JSON.stringify(userData)
    );

    setUser(userData);
  }

  setIsLoggedIn(true);

  setShowLogin(false);
  setShowSignup(false);

  if (redirectPath) {
    navigate(redirectPath);
    setRedirectPath(null);
  }
};

const logout = () => {
  localStorage.removeItem("ss_logged_in");
  localStorage.removeItem("ss_user");

  setIsLoggedIn(false);
  setUser(null);

  setRedirectPath(null);
  navigate("/");
};

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,

        showLogin,
        showSignup,

        redirectPath,

        openLogin,
        openSignup,
        closeAuth,

        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}