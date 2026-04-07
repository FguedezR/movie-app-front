import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Registro exitoso. Ahora inicia sesión.");
        navigate("/login");
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (err) {
      alert("Error en el servidor");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[url('/login-background.jpg')] bg-cover">
      <form
        onSubmit={handleSubmit}
        className="bg-black/80 p-10 rounded-lg flex flex-col w-[400px] border border-gray-800"
      >
        <img src="/logo.svg" className="w-24 self-center mb-8" alt="logo" />
        <h2 className="text-2xl font-bold mb-6 self-center">Crear cuenta</h2>

        <input
          type="text"
          placeholder="Nombre de usuario"
          className="bg-[#31343e] p-3 rounded mb-4 outline-none focus:ring-2 ring-blue-500"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-[#31343e] p-3 rounded mb-4 outline-none focus:ring-2 ring-blue-500"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="bg-[#31343e] p-3 rounded mb-6 outline-none focus:ring-2 ring-blue-500"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        <button className="bg-blue-600 py-3 rounded font-bold hover:bg-blue-700 transition uppercase tracking-widest">
          Registrarse
        </button>

        <p className="mt-4 text-gray-400 text-sm self-center">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-white hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
