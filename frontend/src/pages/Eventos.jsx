import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import EventoForm from "../componentes/EventoForm";
import EventoCard from "../componentes/EventoCard";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("");
  const [editarEvento, setEditarEvento] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [tipoUsuario, setTipoUsuario] = useState(localStorage.getItem("tipoUsuario"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();

  const isAdmin = tipoUsuario === "admin";

  const carregarEventos = async () => {
    try {
      const res = await api.get("/eventos/");
      let filtrados = res.data;

      if (busca) {
        filtrados = filtrados.filter(e =>
          e.titulo.toLowerCase().includes(busca.toLowerCase())
        );
      }

      if (tipo) {
        filtrados = filtrados.filter(e => e.tipo === tipo);
      }

      setEventos(filtrados);
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Sessão expirada. Faça login novamente.");
        localStorage.clear();
        navigate("/");
      } else {
        alert("Erro ao carregar eventos");
      }
    }
  };

  const excluirEvento = async (id) => {
    try {
      await api.delete(`/eventos/${id}`);
      carregarEventos();
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Você não tem permissão para excluir este evento.");
      } else {
        alert("Erro ao excluir evento");
      }
    }
  };

  useEffect(() => {
    if (!token || !tipoUsuario) {
      alert("Você precisa estar logado.");
      navigate("/");
      return;
    }

    carregarEventos();
  }, [busca, tipo]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h2>Eventos</h2>
        <div className="d-flex align-items-center gap-3">
          <span className="fw-bold">Olá, {username}</span>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              localStorage.clear();
              setToken(null);
              setTipoUsuario(null);
              setUsername(null);
              navigate("/");
            }}
          >
            Sair
          </button>
        </div>
      </div>

      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Buscar por título"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select
          className="form-select"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="">Todos os tipos</option>
          <option value="Festival">Festival</option>
          <option value="Religioso">Religioso</option>
          <option value="Cultural">Cultural</option>
          <option value="Esportivo">Esportivo</option>
        </select>
      </div>

      {isAdmin && (
        <EventoForm
          carregarEventos={carregarEventos}
          eventoParaEditar={editarEvento}
          limparEdicao={() => setEditarEvento(null)}
        />
      )}

      <div className="row mt-4">
        {eventos.map((evento) => (
          <EventoCard
            key={evento.id}
            evento={evento}
            onDelete={() => excluirEvento(evento.id)}
            onEdit={() => setEditarEvento(evento)}
            podeEditar={isAdmin}
          />
        ))}
      </div>
    </div>
  );
}
