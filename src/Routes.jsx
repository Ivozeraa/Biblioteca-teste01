import { Routes, Route } from "react-router-dom";
import { Inicio } from "./pages/Inicio";
import { Login } from "./pages/Login";
import { AddLivro } from "./pages/AddLivro";
import Register from "./pages/Registro";
import { BuscarLivros } from "./pages/BuscarLivros";
import { MeusEmprestimos } from "./pages/MeusEmprestimos";
import { Layout } from './Layout';
import { Config } from "./pages/Config";

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
        <Route path="emprestimos" element={<MeusEmprestimos />} />
        <Route path="config" element={<Config />} />
      </Route>
    </Routes>
  );
}
