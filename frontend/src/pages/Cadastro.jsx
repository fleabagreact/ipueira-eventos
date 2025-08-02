import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async () => {
    try {
      if (username.toLowerCase() === "admin") {
        alert("Esse nome de usuário é reservado.");
        return;
      }

      const response = await api.post("/auth/register", { username, password });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("tipoUsuario", "user");
      alert("Cadastro realizado com sucesso!");
      navigate("/eventos");
    } catch (error) {
      alert("Erro ao cadastrar. Tente outro nome de usuário.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cadastro de Usuário</h2>
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
      <button className="btn btn-success" onClick={handleCadastro}>
        Cadastrar
      </button>
    </div>
  );
}
