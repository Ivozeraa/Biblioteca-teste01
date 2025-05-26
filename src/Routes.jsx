import { Routes, Route } from "react-router-dom";
import { Inicio } from "./pages/Inicio";
import { Login } from "./pages/Login";
import Register from "./pages/Registro";
import { BuscarLivros } from "./pages/BuscarLivros";
import { MeusEmprestimos } from "./pages/MeusEmprestimos";
import { Reservas } from "./pages/Reservas";
import { Layout } from './Layout'

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Livros" element={<BuscarLivros />} />
        <Route path="/Emprestimos" element={<MeusEmprestimos/>}/>
        <Route path="/Reservas" element={<Reservas/>}/>
        

      </Route>

    </Routes>
  );
}