import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, Search, Plus, LogOut, User, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [term, setTerm] = useState("");
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Nuevo para móvil

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) setShow(false);
      else setShow(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const handleInputChange = (e) => {
  const value = e.target.value;
  setTerm(value);
  
  if (value.trim().length > 0) {
    // Navegamos a la página de búsqueda
    navigate(`/search?q=${encodeURIComponent(value)}`, { replace: true });
  } else {
    // Si borramos todo, volvemos al inicio
    if (location.pathname === "/search") {
      navigate(`/`, { replace: true });
    }
  }
};

  return (
    <>
      {/* --- NAVBAR SUPERIOR --- */}
      <nav
        className={`fixed top-0 z-[100] w-full px-6 md:px-12 h-20 bg-[#040714]/95 backdrop-blur-md transition-transform duration-500 flex items-center justify-between ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* IZQUIERDA: LOGO */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center group">
            <span className="text-2xl md:text-3xl font-black tracking-tighter italic">
              <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-white bg-clip-text text-transparent">
                Film
              </span>
              <span className="text-white">Point</span>
            </span>
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full ml-0.5 mt-2 animate-pulse"></span>
          </Link>

          {/* Menú Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavItem label="INICIO" to="/" Icon={Home} />
            {user && <NavItem label="MI LISTA" to="/watchlist" Icon={Plus} />}
          </div>
        </div>

        {/* DERECHA: BÚSQUEDA + USUARIO */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Buscador Desktop */}
          <div className="hidden md:flex items-center border-b border-gray-600 focus-within:border-white transition-all pb-1 group">
            <input
              type="text"
              value={term}
              onChange={handleInputChange}
              placeholder="BUSCAR"
              className="bg-transparent outline-none text-[12px] font-bold tracking-widest text-white w-24 focus:w-48 transition-all duration-300 text-right pr-2 placeholder:text-gray-500"
            />
            <Search
              size={18}
              className="text-gray-400 group-hover:text-white transition-colors"
            />
          </div>

          {/* Lupa para abrir buscador en Móvil */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            <Search size={24} />
          </button>

          {/* Perfil / Login */}
          {user ? (
            <div className="group relative flex items-center gap-3 cursor-pointer">
              <Link to="/profile" className="flex items-center gap-2">
                <span className="hidden md:block text-[11px] font-bold tracking-widest text-white uppercase">
                  {user.username}
                </span>
                <img
                  src={
                    user.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
                  }
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-transparent group-hover:border-white transition-all shadow-xl"
                  alt="User"
                />
              </Link>
              <div className="absolute top-full right-0 pt-2 w-48 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-[#131313] border border-gray-800 rounded-md overflow-hidden shadow-2xl">
                  <button
                    onClick={() => logout()}
                    className="w-full text-left p-4 text-[11px] font-bold hover:bg-red-600/10 flex items-center gap-2 transition-colors text-red-400"
                  >
                    <LogOut size={14} /> CERRAR SESIÓN
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 px-4 md:px-6 py-2 rounded text-[11px] font-bold tracking-widest hover:bg-blue-700 transition-all uppercase"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* --- BUSCADOR OVERLAY (MÓVIL) --- */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[200] bg-[#040714] p-6 flex flex-col animate-fadeIn">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-bold tracking-tighter italic">
              FilmPoint
            </span>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-white"
            >
              <X size={30} />
            </button>
          </div>
          <div className="relative">
            <input
              autoFocus
              type="text"
              value={term}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") setIsSearchOpen(false);
              }}
              placeholder="Películas, series, personajes..."
              className="w-full bg-gray-800/50 border-b-2 border-blue-500 p-4 text-lg outline-none rounded-t-md"
            />
            <Search className="absolute right-4 top-4 text-gray-500" />
          </div>
          <p className="mt-4 text-gray-500 text-sm italic">
            Escribe para empezar a buscar...
          </p>
        </div>
      )}

      {/* --- BARRA NAVEGACIÓN INFERIOR (MÓVIL) --- */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full h-16 bg-[#040714] border-t border-gray-800 z-[100] flex items-center justify-around px-2">
        <MobileLink
          to="/"
          Icon={Home}
          label="Inicio"
          active={location.pathname === "/"}
        />
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <Search size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Buscar
          </span>
        </button>
        {user && (
          <MobileLink
            to="/watchlist"
            Icon={Plus}
            label="Lista"
            active={location.pathname === "/watchlist"}
          />
        )}
        <MobileLink
          to="/profile"
          Icon={User}
          label="Perfil"
          active={location.pathname === "/profile"}
        />
      </div>
    </>
  );
};

// Componente para los links móviles
const MobileLink = ({ to, Icon, label, active }) => (
  <Link
    to={to}
    className={`flex flex-col items-center gap-1 transition-colors ${active ? "text-white" : "text-gray-500"}`}
  >
    <Icon size={20} />
    <span className="text-[10px] font-bold uppercase tracking-widest">
      {label}
    </span>
  </Link>
);

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
