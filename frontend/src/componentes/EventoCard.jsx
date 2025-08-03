import React from "react";

export default function EventoCard({ evento, onDelete, onEdit, podeEditar }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{evento.titulo}</h5>
        <p className="card-text">
          <strong>Tipo:</strong> {evento.tipo}
        </p>
        <p className="card-text">
          <strong>Data:</strong> {new Date(evento.data).toLocaleDateString("pt-BR")}
        </p>
        <p className="card-text">
          <strong>Descrição:</strong> {evento.descricao}
        </p>
        {podeEditar && (
          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-sm btn-primary" onClick={onEdit}>
              Editar
            </button>
            <button className="btn btn-sm btn-danger" onClick={onDelete}>
              Excluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
