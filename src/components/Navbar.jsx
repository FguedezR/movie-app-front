import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [term, setTerm] = useState("");
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  // 1. Lógica de Scroll (Aparecer/Desaparecer)
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) setShow(false);
      else setShow(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // 2. Lógica de búsqueda en tiempo real
  const handleInputChange = (e) => {
    const value = e.target.value;
    setTerm(value);

    if (value.trim().length > 0) {
      // Navega a la página de búsqueda mientras escribes
      // 'replace: true' evita que cada letra cree una nueva entrada en el historial del navegador
      navigate(`/search?q=${value}`, { replace: true });
    } else {
      // Si borras todo, vuelve al inicio o mantén la URL limpia
      navigate(`/`, { replace: true });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue al dar Enter
  };

  return (
    <nav
      className={`fixed top-0 z-[100] w-full px-12 h-20 bg-[#090b13]/95 backdrop-blur-md transition-transform duration-500 flex items-center justify-between ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* IZQUIERDA: USUARIO */}
      <div className="flex items-center group cursor-pointer min-w-50">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-white transition-all shadow-lg"
          alt="User"
        />
        <span className="ml-3 text-xs font-bold tracking-[2px] text-gray-400 group-hover:text-white transition-colors uppercase">
          Fernando
        </span>
      </div>

      {/* CENTRO: MENÚ */}
      <div className="flex-1 flex items-center justify-center space-x-10">
        <NavItem label="INICIO" to="/" icon="🏠" />
        <NavItem label="MI LISTA" to="/watchlist" icon="+" />
        <NavItem label="PELÍCULAS" to="/movies" icon="🎬" />
        <NavItem label="SERIES" to="/series" icon="📺" />
        <NavItem label="ORIGINALES" to="/originals" icon="⭐" />
      </div>

      {/* DERECHA: BÚSQUEDA */}
      <div className="flex justify-end min-w-50">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center group border-b border-gray-600 focus-within:border-white transition-all pb-1"
        >
          <input
            type="text"
            value={term}
            onChange={handleInputChange}
            placeholder="BUSCAR"
            className="bg-transparent outline-none text-[12px] font-bold tracking-widest text-white w-24 focus:w-44 transition-all duration-300 text-right pr-2 placeholder:text-gray-500"
          />
          <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity">
            🔍
          </span>
        </form>
      </div>
    </nav>
  );
};

// Componente NavItem (dentro del mismo archivo está bien)
const NavItem = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center space-x-2 group">
    <span className="text-sm opacity-80 group-hover:opacity-100">{icon}</span>
    <span className="text-[12px] font-bold tracking-[2px] text-white/70 group-hover:text-white relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:transition-all after:duration-300 group-hover:after:w-full uppercase">
      {label}
    </span>
  </Link>
);

export default Navbar;
