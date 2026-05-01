import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const savedUser = localStorage.getItem("disney_user");
    const token = localStorage.getItem("disney_token");

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error al parsear el usuario", e);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {

    localStorage.setItem("disney_token", token);
    localStorage.setItem("disney_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("disney_token");
    localStorage.removeItem("disney_user");

    setUser(null);

    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
