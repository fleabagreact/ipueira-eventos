import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import EventoForm from "../componentes/EventoForm";
import EventoCard from "../componentes/EventoCard";

export default function Eventos() {
  const [listaEventos, setListaEventos] = useState([]);
  const [buscaTexto, setBuscaTexto] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [chaveSessao, setChaveSessao] = useState(localStorage.getItem("token"));
  const [perfilUsuario, setPerfilUsuario] = useState(localStorage.getItem("tipoUsuario"));
  const [usuarioAtual, setUsuarioAtual] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();

  const isAdmin = perfilUsuario === "admin";

  const atualizarEventos = async () => {
    try {
      const res = await api.get("/eventos/");
      let eventosFiltrados = res.data;

      if (buscaTexto) {
        eventosFiltrados = eventosFiltrados.filter(ev =>
          ev.titulo.toLowerCase().includes(buscaTexto.toLowerCase())
        );
      }

      if (filtroTipo) {
        eventosFiltrados = eventosFiltrados.filter(ev => ev.tipo === filtroTipo);
      }

      setListaEventos(eventosFiltrados);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Sessão expirada. Faça login novamente.");
        localStorage.clear();
        navigate("/");
      } else {
        alert("Erro ao carregar eventos.");
      }
    }
  };

  const removerEvento = async (id) => {
    try {
      await api.delete(`/eventos/${id}`);
      atualizarEventos();
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Você não tem permissão para excluir este evento.");
      } else {
        alert("Erro ao excluir evento.");
      }
    }
  };

  useEffect(() => {
    if (!chaveSessao || !perfilUsuario) {
      alert("Você precisa estar logado.");
      navigate("/");
      return;
    }

    atualizarEventos();
  }, [buscaTexto, filtroTipo]);

  return (
    <div className="container">
      <div className="header-eventos">
        <h2>Eventos em Ipueira</h2>
        <div className="d-flex align-items-center gap-3">
          <span className="usuario-nome">Olá, {usuarioAtual}</span>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              localStorage.clear();
              setChaveSessao(null);
              setPerfilUsuario(null);
              setUsuarioAtual(null);
              navigate("/");
            }}
          >
            Sair
          </button>
        </div>
      </div>

      <div className="filtros-eventos">
        <input
          className="form-control"
          placeholder="Buscar por título"
          value={buscaTexto}
          onChange={(e) => setBuscaTexto(e.target.value)}
        />
        <select
          className="form-select"
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
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
          carregarEventos={atualizarEventos}
          eventoParaEditar={eventoSelecionado}
          limparEdicao={() => setEventoSelecionado(null)}
        />
      )}

      <div className="d-flex flex-wrap gap-4 justify-content-center mt-4">
        {listaEventos.map((evento) => (
          <EventoCard
            key={evento.id}
            evento={evento}
            onDelete={() => removerEvento(evento.id)}
            onEdit={() => setEventoSelecionado(evento)}
            podeEditar={isAdmin}
          />
        ))}
      </div>
    </div>
  );
}
