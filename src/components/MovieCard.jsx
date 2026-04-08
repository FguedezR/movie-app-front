import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  // 1. Definimos la URL base para las imágenes de TMDB
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  // 2. Construimos la URL de la imagen.
  // Intentamos usar movie.poster (por si viene de tu back procesado)
  // o movie.poster_path (formato original TMDB)
  const posterUrl = movie.poster
    ? movie.poster
    : movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image";

  // 3. TMDB usa 'title' para películas y 'name' para series
  const displayTitle = movie.title || movie.name || "Sin título";

  // 4. TMDB usa 'release_date' o 'first_air_date'
  const displayYear = (movie.release_date || movie.first_air_date || "").split(
    "-",
  )[0];

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative cursor-pointer block"
    >
      <div className="relative border-[3px] border-transparent group-hover:border-white transition-all duration-300 rounded-lg overflow-hidden shadow-xl bg-gray-900 aspect-[2/3]">
        <img
          src={posterUrl}
          alt={displayTitle}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay con Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
          <h4 className="text-[11px] font-bold truncate text-white uppercase tracking-wider">
            {displayTitle}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            {displayYear && (
              <span className="text-[9px] text-gray-400 font-bold">
                {displayYear}
              </span>
            )}
            <span className="text-[9px] border border-gray-500 px-1 rounded text-gray-400 uppercase font-medium">
              {movie.media_type || (movie.title ? "Movie" : "TV")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
