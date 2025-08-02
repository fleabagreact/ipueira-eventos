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
        data: eventoParaEditar.data.split(".")[0] // remove milissegundos
      });
    }
  }, [eventoParaEditar]);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async () => {
    try {
      if (eventoParaEditar) {
        await api.put(`/eventos/${eventoParaEditar.id}`, form);
      } else {
        await api.post("/eventos/", form);
      }
      setForm({ titulo: "", descricao: "", data: "", local: "", tipo: "" });
      carregarEventos();
      limparEdicao();
    } catch (err) {
      alert("Erro ao salvar evento");
    }
  };

  return (
    <div className="card p-3">
      <h4>{eventoParaEditar ? "Editar Evento" : "Novo Evento"}</h4>
      <input name="titulo" className="form-control my-2" placeholder="Título" value={form.titulo} onChange={handleChange} />
      <textarea name="descricao" className="form-control my-2" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
      <input name="data" type="datetime-local" className="form-control my-2" value={form.data} onChange={handleChange} />
      <input name="local" className="form-control my-2" placeholder="Local" value={form.local} onChange={handleChange} />
      <select name="tipo" className="form-select my-2" value={form.tipo} onChange={handleChange}>
        <option value="">Selecione o tipo</option>
        <option value="Festival">Festival</option>
        <option value="Religioso">Religioso</option>
        <option value="Cultural">Cultural</option>
        <option value="Esportivo">Esportivo</option>
      </select>
      <button className="btn btn-primary" onClick={handleSubmit}>
        {eventoParaEditar ? "Atualizar" : "Criar"}
      </button>
    </div>
  );
}
