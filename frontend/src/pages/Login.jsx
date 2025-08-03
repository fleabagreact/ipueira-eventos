import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const autenticar = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        username: usuario,
        password: senha,
      });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("tipoUsuario", res.data.role);
      localStorage.setItem("username", usuario);

      navigate("/eventos");
    } catch (err) {
      alert("Erro ao fazer login: " + (err.response?.data?.detail || "Tente novamente."));
    }
  };

  return (
    <div className="caixa-formulario">
      <h2>Login na Plataforma de Eventos de Ipueira</h2>
      <form onSubmit={autenticar}>
        <div className="mb-3">
          <label className="form-label">Usuário</label>
          <input
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100" type="submit">Entrar</button>
      </form>

      <p className="mt-3 text-center">
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  );
}
