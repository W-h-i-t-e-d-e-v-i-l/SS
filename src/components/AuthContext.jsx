import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  const isLoggedIn =
    localStorage.getItem("ss_logged_in") === "true";

  const openLogin = (path = null) => {
    setRedirectPath(path);
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const login = () => {
    localStorage.setItem("ss_logged_in", "true");
    setShowLogin(false);
  };

  const logout = () => {
    localStorage.removeItem("ss_logged_in");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        showLogin,
        redirectPath,
        openLogin,
        closeLogin,
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