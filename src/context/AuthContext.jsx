import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Usamos los nombres correctos: "disney_user" y "disney_token"
    const savedUser = localStorage.getItem("disney_user");
    const token = localStorage.getItem("disney_token");

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error al parsear el usuario", e);
        logout(); // Si el JSON está corrupto, limpiamos todo
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    // Guardamos con el prefijo "disney_"
    localStorage.setItem("disney_token", token);
    localStorage.setItem("disney_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // CORRECCIÓN: Borramos exactamente las mismas llaves que creamos
    localStorage.removeItem("disney_token");
    localStorage.removeItem("disney_user");

    setUser(null);

    // No es estrictamente necesario el window.location.href si usas setUser(null),
    // pero ayuda a limpiar cualquier estado residual de la app.
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
