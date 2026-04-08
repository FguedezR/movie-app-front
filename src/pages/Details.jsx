import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Check, Plus, Play, Star, Info } from "lucide-react";

const Details = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("sugerencias");
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const API_KEY = "592645d02224a086ee675ff498e545ca";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  // 1. CARGAR DATOS DE LA PELÍCULA
  useEffect(() => {
    const fetchData = async () => {
      try {
        let movieRes = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`,
        );
        let data = await movieRes.json();

        if (data.success === false) {
          movieRes = await fetch(
            `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=es-ES`,
          );
          data = await movieRes.json();
        }

        setMovie(data);

        const type = data.first_air_date ? "tv" : "movie";
        const recRes = await fetch(
          `${BASE_URL}/${type}/${id}/recommendations?api_key=${API_KEY}&language=es-ES`,
        );
        const recData = await recRes.json();
        setRecommendations(recData.results || []);

        const reviewsRes = await fetch(
          `http://localhost:5001/api/reviews/movie/${id}`,
        );
        const reviewsData = await reviewsRes.json();
        setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      } catch (err) {
        console.error("Error en fetchData:", err);
      }
    };

    if (id) fetchData();
  }, [id]);

  // 2. COMPROBAR SI ESTÁ EN LA WATCHLIST (Hook independiente en nivel superior)
  useEffect(() => {
    const checkWatchlist = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem("disney_token");
        const res = await fetch("http://localhost:5001/api/watchlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const list = await res.json();
        const found = list.some((item) => item.movieId === id);
        setIsInWatchlist(found);
      } catch (err) {
        console.error("Error comprobando lista:", err);
      }
    };
    checkWatchlist();
  }, [id, user]);

  // 3. FUNCIÓN PARA AÑADIR/QUITAR (Definida fuera de los useEffect)
  const handleWatchlist = async () => {
    if (!user) {
      alert("¡Oye! Inicia sesión para guardar tus favoritos.");
      return;
    }

    try {
      const token = localStorage.getItem("disney_token");
      const res = await fetch("http://localhost:5001/api/watchlist/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: id,
          title: movie.title || movie.name,
          posterPath: movie.backdrop_path || movie.poster_path,
          type: movie.first_air_date ? "tv" : "movie",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsInWatchlist(data.added);
      }
    } catch (err) {
      console.error("Error al actualizar la lista:", err);
    }
  };

  const handleSubmitReview = async () => {
    if (!user) return alert("Debes iniciar sesión");
    if (rating === 0 || !comment.trim())
      return alert("Completa todos los campos");

    try {
      const token = localStorage.getItem("disney_token");
      const res = await fetch("http://localhost:5001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: id,
          movieTitle: movie.title || movie.name,
          rating,
          comment,
        }),
      });

      if (res.ok) {
        alert("¡Gracias! Tu reseña ha sido enviada para moderación.");
        setComment("");
        setRating(0);
      }
    } catch (err) {
      alert("Error de conexión con el servidor.");
    }
  };

  if (!movie)
    return (
      <div className="h-screen flex items-center justify-center bg-[#040714] text-white">
        Cargando...
      </div>
    );

  return (
    <div className="relative min-h-screen bg-[#040714] text-white overflow-x-hidden">
      {/* Fondo de pantalla */}
      <div className="fixed top-0 left-0 w-full h-[90vh] z-0 opacity-30">
        <img
          src={`${IMAGE_BASE}${movie.backdrop_path}`}
          className="w-full h-full object-cover"
          alt={movie.title || movie.name}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040714] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 pt-32 px-8 md:px-16 lg:px-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          {movie.title || movie.name}
        </h1>

        <div className="flex items-center gap-4 mb-8">
          <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition font-bold uppercase text-sm">
            <Play fill="black" size={20} /> Ver Ahora
          </button>

          <button
            onClick={handleWatchlist}
            className={`p-3 rounded-full border-2 transition-all duration-300 ${
              isInWatchlist
                ? "bg-white text-black border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                : "border-white bg-black/40 hover:bg-white/10"
            }`}
          >
            {isInWatchlist ? (
              <Check size={24} strokeWidth={3} />
            ) : (
              <Plus size={24} />
            )}
          </button>
        </div>

        {/* Info Película */}
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-bold text-gray-400 mb-4 flex gap-2">
            <span>
              {(movie.release_date || movie.first_air_date)?.split("-")[0]}
            </span>
            <span>•</span>
            <span>
              {movie.runtime || movie.episode_run_time?.[0] || "--"} min
            </span>
            <span>•</span>
            <span className="text-white">
              {movie.genres?.map((g) => g.name).join(", ")}
            </span>
          </p>
          <p className="text-lg leading-relaxed text-gray-200 italic">
            {movie.overview || "Sin sinopsis disponible."}
          </p>
        </div>

        {/* Pestañas */}
        <div className="mt-16 border-b border-gray-800 flex gap-8 mb-8">
          {["sugerencias", "detalles"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold tracking-[2px] uppercase relative transition-all ${
                activeTab === tab
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white animate-in" />
              )}
            </button>
          ))}
        </div>

        {/* Contenido Pestañas */}
        <div className="py-10 min-h-[400px]">
          {activeTab === "sugerencias" ? (
            <div className="animate-fadeIn grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendations.length > 0 ? (
                recommendations.slice(0, 8).map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => {
                      navigate(`/movie/${rec.id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-lg border-2 border-transparent group-hover:border-gray-300 transition-all duration-300 shadow-xl">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${rec.backdrop_path || rec.poster_path}`}
                        alt={rec.title || rec.name}
                        className="w-full h-32 md:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play size={30} fill="white" />
                      </div>
                    </div>
                    <h4 className="mt-3 text-sm font-bold truncate text-gray-300 group-hover:text-white">
                      {rec.title || rec.name}
                    </h4>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic col-span-full">
                  No hay recomendaciones disponibles.
                </p>
              )}
            </div>
          ) : (
            <div className="animate-fadeIn max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[2px] mb-2">
                  Sinopsis
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {movie.overview}
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[2px] mb-1">
                    Puntuación TMDB
                  </h3>
                  <p className="text-xl font-bold text-yellow-500">
                    {movie.vote_average?.toFixed(1)} / 10
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[2px] mb-1">
                    Idioma Original
                  </h3>
                  <p className="text-sm uppercase">{movie.original_language}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reseñas */}
        <div className="mt-10 max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          {/* Formulario */}
          <div className="bg-[#131313]/80 p-8 rounded-xl border border-gray-800 self-start">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Star className="text-yellow-500" size={20} /> Deja tu opinión
            </h3>
            {user ? (
              <div className="space-y-4">
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={24}
                      onClick={() => setRating(s)}
                      className={`cursor-pointer transition-all ${rating >= s ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                    />
                  ))}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Escribe aquí tu reseña..."
                  className="w-full bg-black/40 border border-gray-800 p-4 rounded-lg text-sm outline-none h-32"
                />
                <button
                  onClick={handleSubmitReview}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold uppercase"
                >
                  Enviar Reseña
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-white text-black py-2 rounded font-bold uppercase"
              >
                Ir al Login
              </button>
            )}
          </div>

          {/* Lista */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">
              Comentarios ({reviews.length})
            </h3>
            <div className="max-h-125 overflow-y-auto pr-2 space-y-4">
              {reviews.length === 0 ? (
                <p className="text-gray-500 italic">No hay reseñas aún.</p>
              ) : (
                reviews.map((rev) => (
                  <div
                    key={rev._id}
                    className="bg-[#1a1a1a]/40 p-5 rounded-xl border border-gray-800"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-blue-400">
                        {rev.userId?.username}
                      </span>
                      <div className="text-yellow-500 text-[10px]">
                        {"★".repeat(rev.rating)}
                      </div>
                    </div>
                    <p className="text-gray-300 italic">"{rev.comment}"</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
