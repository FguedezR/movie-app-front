import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, Search, Plus, Star, Film, Tv, LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [term, setTerm] = useState("");
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      navigate(`/search?q=${encodeURIComponent(value)}`, { replace: true });
    } else if (location.pathname === "/search") {
      navigate(`/`, { replace: true });
    }
  };

  return (
    <nav
      className={`fixed top-0 z-[100] w-full px-6 md:px-12 h-20 bg-[#040714]/95 backdrop-blur-md transition-transform duration-500 flex items-center justify-between ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* IZQUIERDA: LOGO Y MENÚ */}
      <div className="flex items-center gap-10">
        <Link to="/">
          <img src="/logo.svg" className="w-20 min-w-20" alt="MOVIES" />
        </Link>

        {/* MENÚ DESKTOP (Iconos + Texto) */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavItem label="INICIO" to="/" Icon={Home} />
          {user && <NavItem label="MI LISTA" to="/watchlist" Icon={Plus} />}
          <NavItem label="ORIGINALES" to="/originals" Icon={Star} />
          <NavItem label="PELÍCULAS" to="/movies" Icon={Film} />
          <NavItem label="SERIES" to="/series" Icon={Tv} />
        </div>
      </div>

      {/* DERECHA: BÚSQUEDA + USUARIO */}
      <div className="flex items-center gap-6">
        {/* Input de Búsqueda Estilizado */}
        <div className="hidden sm:flex items-center border-b border-gray-600 focus-within:border-white transition-all pb-1 group">
          <input
            type="text"
            value={term}
            onChange={handleInputChange}
            placeholder="BUSCAR"
            className="bg-transparent outline-none text-[12px] font-bold tracking-widest text-white w-20 focus:w-40 transition-all duration-300 text-right pr-2 placeholder:text-gray-500"
          />
          <Search
            size={18}
            className="text-gray-400 group-hover:text-white transition-colors"
          />
        </div>

        {/* PERFIL / LOGIN */}
        {user ? (
          <div className="group relative flex items-center gap-3 cursor-pointer">
            <Link to="/profile" className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[11px] font-bold tracking-[2px] text-white uppercase">
                  {user.username}
                </span>
              </div>
              <img
                src={
                  user.avatar ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                }
                className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-white transition-all shadow-xl"
                alt="User"
              />
            </Link>
            {/* Dropdown al hacer Hover */}
            <div className="absolute top-10 right-0 mt-2 w-40 bg-[#131313] border border-gray-800 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto shadow-2xl">
              <div className="p-4 border-b border-gray-800 lg:hidden">
                <p className="text-[10px] text-gray-500 font-bold uppercase">
                  Menú rápido
                </p>
                <Link
                  to="/search"
                  className="block text-xs mt-2 hover:text-blue-400"
                >
                  Buscar
                </Link>
              </div>
              <button
                onClick={() => logout()}
                className="w-full text-left p-4 text-[11px] font-bold hover:bg-gray-800 flex items-center gap-2 transition-colors text-red-400 hover:text-red-300"
              >
                <LogOut size={14} /> CERRAR SESIÓN
              </button>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 px-6 py-2 rounded text-[12px] font-bold tracking-[1.5px] hover:bg-blue-700 transition-all duration-300 uppercase shadow-lg shadow-blue-900/20"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

// Subcomponente NavItem optimizado
const NavItem = ({ to, Icon, label }) => (
  <Link to={to} className="flex items-center space-x-3 group relative">
    <Icon
      size={18}
      className="text-white opacity-90 group-hover:scale-110 transition-transform"
    />
    <span className="text-[13px] font-bold tracking-[1.5px] text-white/90 group-hover:text-white relative uppercase">
      {label}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
    </span>
  </Link>
);

export default Navbar;
