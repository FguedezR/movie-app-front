import { useEffect, useState } from "react";
import { getPopularMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    getPopularMovies()
      .then((data) => {
        // data debe ser un array antes de guardarlo
        setMovies(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  //  spinner
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#040714]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // si no hay películas tras cargar (error de API), avisamos
  if (movies.length === 0) {
    return (
      <div className="pt-24 text-center">No se encontraron películas.</div>
    );
  }

  // si llegamos aquí, movies es un array con datos
  const heroMovie = movies[0];

  return (
    <div className="pt-20 pb-10">
      {/* Hero Banner con validación de imagen */}
      <section className="relative h-[60vh] mx-4 md:mx-12 rounded-xl overflow-hidden shadow-2xl group border-4 border-transparent hover:border-gray-400 transition-all duration-500">
        <div className="absolute inset-0 bg-linear-to-r from-[#040714] via-transparent to-transparent z-10" />
        {heroMovie?.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            className="w-full h-full object-cover"
            alt={heroMovie.title}
          />
        )}
        <div className="absolute inset-y-0 left-10 flex flex-col justify-center z-20 max-w-lg">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {heroMovie?.title}
          </h2>
          <p className="text-gray-300 line-clamp-3 mb-6">
            {heroMovie?.overview}
          </p>
        </div>
      </section>

      {/* Grid de Películas con validación */}
      <section className="mt-12 px-4 md:px-12">
        <h3 className="text-xl font-bold mb-6 tracking-wide text-gray-300">
          Recomendado para ti
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;