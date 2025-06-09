import { Routes, Route } from "react-router-dom";
import { Inicio } from "./pages/Inicio";
import { Login } from "./pages/Login";
import { AddLivro } from "./pages/AddLivro";
import Register from "./pages/Registro";
import { BuscarLivros } from "./pages/BuscarLivros";
import { Emprestimos } from "./pages/Emprestimos";
import { Layout } from './Layout';
import { Config } from "./pages/Config";
import { Reservas } from "./pages/Reservas";

export default function RoutesApp() {
  return (
    <Routes>
      {/* Rotas públicas sem layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="addLivro" element={<AddLivro />} />

      {/* Rotas com layout padrão */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="livros" element={<BuscarLivros />} />
        <Route path="emprestimos" element={<Emprestimos />} />
        <Route path="config" element={<Config />} />
        <Route path="reservas" element={<Reservas />} />

      </Route>
    </Routes>
  );
}
