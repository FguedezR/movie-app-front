import { useState, useEffect } from "react"; // 1. IMPORTACIÓN NECESARIA
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Banner from "../components/Banner";
import MovieRow from "../components/MovieRow";
import requests from "../utils/requests";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myList, setMyList] = useState([]);

  // cargar mi lista desde el backend
  useEffect(() => {
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
      }
    };

    fetchMyList();
  }, [user]);

  return (
    <div className="bg-[#040714] min-h-screen text-white pb-20">
      {/* 1. Banner Principal */}
      <Banner fetchUrl={requests.fetchTrending} />

      <div className="flex flex-col gap-4 -mt-20 relative z-20">
        {/* --- SECCIÓN: MI LISTA (Solo aparece si hay películas) --- */}
        {myList.length > 0 && (
          <div className="mb-8 px-8 md:px-16 lg:px-24">
            <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-wide">
              Mi Lista
            </h2>
            <div className="flex gap-4 overflow-x-auto overflow-y-hidden p-2 custom-scrollbar">
              {myList.map((item) => (
                <div
                  key={item.movieId}
                  onClick={() => navigate(`/movie/${item.movieId}`)}
                  className="min-w-[160px] md:min-w-[200px] lg:min-w-[240px] cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
                    alt={item.title}
                    className="rounded-lg shadow-xl border-2 border-transparent hover:border-gray-300 object-cover w-full h-32 md:h-40"
                  />
                  <p className="text-xs mt-2 text-gray-400 truncate">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Filas de Contenido Originales */}
        <MovieRow
          title="Novedades en Disney+"
          fetchUrl={requests.fetchDisneyPlus}
        />
        <MovieRow title="Saga Star Wars" fetchUrl={requests.fetchStarWars} />
        <MovieRow title="Universo Marvel" fetchUrl={requests.fetchMarvel} />
        <MovieRow title="Series Populares" fetchUrl={requests.fetchSeries} />
        <MovieRow title="Acción Adrenalina" fetchUrl={requests.fetchAction} />
        <MovieRow title="Dramas que Conmueven" fetchUrl={requests.fetchDrama} />
        <MovieRow
          title="Documentales Reales"
          fetchUrl={requests.fetchDocumentaries}
        />
      </div>
    </div>
  );
};

export default Home;
