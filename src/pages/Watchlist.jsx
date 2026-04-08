import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Trash2, Play, ArrowLeft } from "lucide-react";

const Watchlist = () => {
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchMyList = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("disney_token");
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const res = await fetch(`${API_URL}/api/watchlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMyList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar mi lista", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyList();
  }, [user]);

  const removeFromWatchlist = async (e, movieId) => {
    e.stopPropagation(); // Evita que al hacer clic en borrar nos lleve a detalles
    try {
      const token = localStorage.getItem("disney_token");
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
      await fetch(`${API_URL}/api/watchlist/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
      });
      // Actualizamos el estado local para quitarla de la vista
      setMyList(myList.filter((item) => item.movieId !== movieId));
    } catch (err) {
      console.error("Error al borrar:", err);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#040714] text-white">
        Cargando tu lista...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#040714] text-white pt-32 px-8 md:px-16 lg:px-24">
      {/* Encabezado */}
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={() => navigate("/")}
          className="p-2 hover:bg-white/10 rounded-full transition"
        >
          <ArrowLeft size={28} />
        </button>
        <h1 className="text-3xl md:text-4xl font-bold">Mi Lista</h1>
      </div>

      {myList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-50">
          <p className="text-xl italic mb-6">Aún no has guardado nada.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-white text-black px-6 py-2 rounded font-bold uppercase text-sm hover:bg-gray-200"
          >
            Explorar películas
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {myList.map((item) => (
            <div
              key={item.movieId}
              onClick={() => navigate(`/movie/${item.movieId}`)}
              className="group relative cursor-pointer"
            >
              {/* Imagen con Efectos */}
              <div className="relative overflow-hidden rounded-lg border-2 border-transparent group-hover:border-gray-300 transition-all duration-300 shadow-2xl">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay al hacer Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                  <Play fill="white" size={40} />
                  <button
                    onClick={(e) => removeFromWatchlist(e, item.movieId)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
                  >
                    <Trash2 size={14} /> Quitar
                  </button>
                </div>
              </div>
              {/* Título */}
              <h3 className="mt-3 text-sm font-semibold truncate text-gray-400 group-hover:text-white transition-colors">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
