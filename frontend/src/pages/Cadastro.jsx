import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Cadastro() {
  const [novoUsuario, setNovoUsuario] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const navigate = useNavigate();

  const registrarConta = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", {
        username: novoUsuario,
        password: novaSenha,
      });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("tipoUsuario", res.data.role);
      localStorage.setItem("username", novoUsuario);

      navigate("/eventos");
    } catch (err) {
      alert("Erro ao cadastrar: " + (err.response?.data?.detail || "Tente novamente."));
    }
  };

  return (
    <div className="caixa-formulario">
      <h2>Cadastro na Plataforma de Eventos de Ipueira</h2>
      <form onSubmit={registrarConta}>
        <div className="mb-3">
          <label className="form-label">Usuário</label>
          <input
            className="form-control"
            value={novoUsuario}
            onChange={(e) => setNovoUsuario(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
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
