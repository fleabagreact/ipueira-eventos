import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Eventos from "./pages/Eventos";
import PrivateRoute from "./componentes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route element={<PrivateRoute />}>
          <Route path="/eventos" element={<Eventos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
