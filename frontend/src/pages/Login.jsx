import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", { username, password });
      const token = response.data.access_token;
      localStorage.setItem("token", token);

      // Decodifica token para pegar o role
      const decoded = jwt_decode(token);
      localStorage.setItem("tipoUsuario", decoded.role || "user");

      alert("Login realizado com sucesso!");
      navigate("/eventos");
    } catch (error) {
      alert("Credenciais inválidas.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
}
