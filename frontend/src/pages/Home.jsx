import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center vh-100">
      <h1 className="display-4 mb-4">Bem-vindo à Plataforma de Eventos</h1>

      <div className="d-flex gap-3">
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
