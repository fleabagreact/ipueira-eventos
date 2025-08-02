export default function EventoCard({ evento, onDelete, onEdit, podeEditar }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{evento.titulo}</h5>
          <p className="card-text">{evento.descricao}</p>
          <p><strong>Local:</strong> {evento.local}</p>
          <p><strong>Data:</strong> {new Date(evento.data).toLocaleString()}</p>
          <p><strong>Tipo:</strong> {evento.tipo}</p>
          {podeEditar && (
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-warning" onClick={onEdit}>Editar</button>
              <button className="btn btn-sm btn-danger" onClick={onDelete}>Excluir</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
