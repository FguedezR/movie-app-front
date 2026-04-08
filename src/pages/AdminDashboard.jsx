import { useState, useEffect } from "react";
import {
  Check,
  X,
  MessageSquare,
  ShieldCheck,
  Trash2,
  Clock,
} from "lucide-react";

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const token = localStorage.getItem("disney_token"); // Asegúrate que sea este nombre

      const res = await fetch("http://localhost:5001/api/reviews/pending", {
        headers: {
          Authorization: `Bearer ${token}`, // Verifica que el espacio esté ahí
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("Datos recibidos:", data);

      // SEGURIDAD: Solo hacemos setPending si la data es un Array
      if (Array.isArray(data)) {
        setPending(data);
      } else {
        console.error("La respuesta no es un array:", data);
        setPending([]); // Evita que .map() falle
      }
    } catch (err) {
      console.error("Error al cargar:", err);
      setPending([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem("disney_token");

      // IMPORTANTE: Verifica que la ruta coincida con el backend
      // Si en backend es /api/reviews/approve/:id
      const url =
        action === "approve"
          ? `http://localhost:5001/api/reviews/approve/${id}` // <--- La barra antes del ${id} es clave
          : `http://localhost:5001/api/reviews/${id}`;

      const res = await fetch(url, {
        method: action === "approve" ? "PUT" : "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        // Quitamos de la lista local para que desaparezca de la vista
        setPending((prev) => prev.filter((rev) => rev._id !== id));
      } else {
        console.error("Error en la petición:", res.status);
      }
    } catch (err) {
      console.error("Error al procesar acción:", err);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#040714] text-white">
        Cargando moderación...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#040714] text-white pt-32 px-8 md:px-16 lg:px-24">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShieldCheck className="text-blue-500" size={32} />
            Panel de Moderación
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-medium uppercase tracking-widest">
            {pending.length} Reseñas esperando revisión
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {pending.length === 0 ? (
          <div className="bg-[#131313] border border-dashed border-gray-800 rounded-2xl p-20 text-center">
            <Check className="mx-auto text-gray-700 mb-4" size={48} />
            <p className="text-gray-500 text-lg">
              ¡Buen trabajo! No hay reseñas pendientes.
            </p>
          </div>
        ) : (
          pending.map((rev) => (
            <div
              key={rev._id}
              className="bg-[#131313] p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-[#1a1a1a] transition-colors group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                    {rev.movieTitle || "Película desconocida"}
                  </span>
                  <span className="text-gray-600 text-xs flex items-center gap-1">
                    <Clock size={12} />{" "}
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="font-bold text-white text-lg mb-1 italic">
                  "{rev.comment}"
                </h4>

                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">Escrito por:</span>
                  <span className="text-blue-400 font-bold">
                    {rev.userId?.username || "Usuario Anónimo"}
                  </span>
                  <div className="flex text-yellow-500 text-xs ml-4">
                    {"★".repeat(rev.rating)}
                    {"☆".repeat(5 - rev.rating)}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 w-full md:w-auto">
                <button
                  onClick={() => handleAction(rev._id, "approve")}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-green-900/20"
                >
                  <Check size={18} /> Aprobar
                </button>
                <button
                  onClick={() => handleAction(rev._id, "reject")}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl border border-red-600/20 font-bold text-xs uppercase tracking-widest transition-all"
                >
                  <Trash2 size={18} /> Rechazar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
