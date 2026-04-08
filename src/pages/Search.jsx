import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { searchMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import { Search as SearchIcon, Film } from "lucide-react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // Aumentamos un poco el debounce para no saturar la API mientras escriben en móvil
  const [debouncedQuery] = useDebounce(query, 500);
  const navigate = useNavigate();

  useEffect(() => {
    const getResults = async () => {
      // Solo buscamos si hay más de 2 caracteres
      if (debouncedQuery.trim().length > 1) {
        setLoading(true);
        try {
          const data = await searchMovies(debouncedQuery);
          // Filtramos resultados que no tengan imagen para mantener la estética premium
          const filteredData = data.filter(item => item.poster_path || item.backdrop_path);
          setResults(filteredData);
        } catch (error) {
          console.error("Error buscando:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    getResults();
  }, [debouncedQuery]);

  return (
    <div className="pt-24 md:pt-32 px-6 md:px-16 min-h-screen bg-[#040714] text-white">
      {/* Indicador de término buscado */}
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-light text-gray-400">
          Resultados para: <span className="text-white font-bold italic">"{query}"</span>
        </h1>
      </div>

      {loading ? (
        // Skeleton o Loader animado
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 animate-pulse">Explorando el catálogo...</p>
        </div>
      ) : results.length > 0 ? (
        // Grid Responsivo mejorado
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-8 animate-fadeIn">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        // Estado vacío (No se encontraron resultados)
        query.length > 1 && (
          <div className="flex flex-col items-center justify-center h-80 text-center opacity-50">
            <SearchIcon size={60} className="mb-4 text-gray-600" />
            <h2 className="text-xl font-semibold">No encontramos "{query}"</h2>
            <p className="text-sm mt-2 max-w-xs">
              Intenta con el título original, un género o el nombre de un actor.
            </p>
            <button 
              onClick={() => navigate("/")}
              className="mt-8 bg-gray-800 hover:bg-white hover:text-black px-6 py-2 rounded-full transition-all text-xs font-bold"
            >
              VOLVER AL INICIO
            </button>
          </div>
        )
      )}

      {/* Footer decorativo si no hay búsqueda activa */}
      {query.length <= 1 && (
        <div className="flex flex-col items-center justify-center h-80 opacity-20">
          <Film size={80} />
          <p className="mt-4 text-lg">Escribe algo para empezar a explorar</p>
        </div>
      )}
    </div>
  );
};

export default Search;