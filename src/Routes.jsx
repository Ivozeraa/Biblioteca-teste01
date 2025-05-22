import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import Register from "./pages/Registro";

export default function RoutesApp(){
    return(
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}