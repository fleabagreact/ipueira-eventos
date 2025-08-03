import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="pagina-inicial container">
      <h1 className="mb-3">Agenda Cultural de Ipueira</h1>
      <p className="lead mb-4">Descubra e participe dos principais eventos da nossa cidade.</p>

      <div className="d-flex gap-3 flex-wrap justify-content-center">
        <Link to="/login">
          <button className="btn btn-primary">Login</button>
        </Link>
        <Link to="/cadastro">
          <button className="btn btn-warning">Cadastro</button>
        </Link>
      </div>
    </div>
  );
}
