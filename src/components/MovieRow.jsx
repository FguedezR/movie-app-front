import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);
  const navigate = useNavigate();

  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(fetchUrl);
      const data = await res.json();
      setMovies(data.results || []);
    };
    fetchMovies();
  }, [fetchUrl]);

  // Lógica para mover el scroll horizontalmente
  const slide = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-12 px-8 md:px-16">
      <h2 className="text-xl font-bold mb-4 text-gray-400 uppercase tracking-widest text-xs">
        {title}
      </h2>

      <div className="group relative">
        <button
          onClick={() => slide("left")}
          className="hidden md:block absolute left-0 top-0 bottom-[60px] z-40 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity px-2 rounded-r-lg"
        >
          <ChevronLeft size={40} />
        </button>

        <div
          ref={rowRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-6" // Añadimos padding vertical aquí
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="min-w-[200px] md:min-w-[280px] cursor-pointer group/card"
            >
              {/* Contenedor de Imagen con Efecto Disney */}
              <div className="relative overflow-hidden rounded-lg border-2 border-transparent group-hover/card:border-gray-300 group-hover/card:scale-105 transition-all duration-300 shadow-2xl">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
              </div>

              {/* INFO FUERA DE LA IMAGEN */}
              <div className="mt-4 px-1">
                <h3 className="text-sm font-bold truncate group-hover/card:text-blue-400 transition-colors">
                  {movie.title || movie.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400 font-bold">
                  <span className="text-green-500">
                    {movie.vote_average?.toFixed(1)} Puntos
                  </span>
                  <span>•</span>
                  <span>
                    {
                      (movie.release_date || movie.first_air_date)?.split(
                        "-",
                      )[0]
                    }
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => slide("right")}
          className="hidden md:block absolute right-0 top-0 bottom-[60px] z-40 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity px-2 rounded-l-lg"
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
