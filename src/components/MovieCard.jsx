import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative cursor-pointer block"
    >
      <div className="relative border-3 border-transparent group-hover:border-white transition-all duration-300 rounded-lg overflow-hidden shadow-xl bg-gray-900">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay con Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
          <h4 className="text-[11px] font-bold truncate text-white">
            {movie.title}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] text-gray-400">{movie.year}</span>
            <span className="text-[9px] border border-gray-500 px-1 rounded text-gray-400 uppercase">
              {movie.adult}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
