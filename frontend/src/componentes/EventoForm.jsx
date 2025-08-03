import { useEffect, useState } from "react";
import api from "../services/api";

export default function EventoForm({ carregarEventos, eventoParaEditar, limparEdicao }) {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    data: "",
    local: "",
    tipo: ""
  });

  useEffect(() => {
    if (eventoParaEditar) {
      setForm({
        ...eventoParaEditar,
        data: eventoParaEditar.data.split(".")[0]
      });
    }
  }, [eventoParaEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (eventoParaEditar) {
        await api.put(`/eventos/${eventoParaEditar.id}`, form);
      } else {
        await api.post("/eventos/", form);
      }

      setForm({
        titulo: "",
        descricao: "",
        data: "",
        local: "",
        tipo: ""
      });

      carregarEventos();
      limparEdicao();
    } catch (err) {
      alert("Erro ao salvar evento");
    }
  };

  return (
    <div className="card p-4 shadow-sm evento-form rounded-4">
      <h4 className="mb-4">
        <i className="bi bi-calendar-plus me-2 text-success" />
        {eventoParaEditar ? "Editar Evento" : "Novo Evento"}
      </h4>

      <div className="mb-3">
        <label className="form-label">
          <i className="bi bi-type me-2" />
          Título
        </label>
        <input
          name="titulo"
          className="form-control"
          placeholder="Título do evento"
          value={form.titulo}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          <i className="bi bi-card-text me-2" />
          Descrição
        </label>
        <textarea
          name="descricao"
          className="form-control"
          placeholder="Descrição do evento"
          value={form.descricao}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          <i className="bi bi-clock me-2" />
          Data e Hora
        </label>
        <input
          name="data"
          type="datetime-local"
          className="form-control"
          value={form.data}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          <i className="bi bi-geo-alt me-2" />
          Local
        </label>
        <input
          name="local"
          className="form-control"
          placeholder="Ex: Praça central"
          value={form.local}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          <i className="bi bi-tags me-2" />
          Tipo de Evento
        </label>
        <select
          name="tipo"
          className="form-select"
          value={form.tipo}
          onChange={handleChange}
        >
          <option value="">Selecione o tipo</option>
          <option value="Festival">Festival</option>
          <option value="Religioso">Religioso</option>
          <option value="Cultural">Cultural</option>
          <option value="Esportivo">Esportivo</option>
        </select>
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>
        <i className="bi bi-check-circle me-2" />
        {eventoParaEditar ? "Atualizar" : "Criar"}
      </button>
    </div>
  );
}
