import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      login(data.user, data.token);
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#040714]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-10 rounded-lg w-96 flex flex-col gap-4 border border-gray-800"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Iniciar Sesión</h2>
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            ¿Eres nuevo en Movie+?{" "}
            <Link
              to="/register"
              className="text-white hover:underline font-bold"
            >
              Suscríbete ahora
            </Link>
          </p>
        </div>
        <input
          type="email"
          placeholder="Email"
          className="p-3 bg-gray-800 rounded outline-none text-white focus:ring-2 ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="p-3 bg-gray-800 rounded outline-none text-white focus:ring-2 ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 p-3 rounded font-bold hover:bg-blue-700 transition">
          ENTRAR
        </button>
      </form>
    </div>
  );
};

export default Login;
