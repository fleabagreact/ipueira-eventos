import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Cadastro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", { username, password });

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("tipoUsuario", response.data.role);
      localStorage.setItem("username", username);

      navigate("/eventos");
    } catch (error) {
      alert("Erro ao cadastrar: " + (error.response?.data?.detail || "Tente novamente."));
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro}>
        <div className="mb-3">
          <label className="form-label">Usuário</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-success w-100" type="submit">Cadastrar</button>
      </form>

      <p className="mt-3 text-center">
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
}
