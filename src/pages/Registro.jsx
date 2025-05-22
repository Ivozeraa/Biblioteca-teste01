// src/pages/Register.jsx
import { useState } from "react";
import { supabase } from "../../SupabaseClient";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setMensagem("Processando...");

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      setMensagem("❌ Erro: " + error.message);
    } else {
      setMensagem("✅ Conta criada com sucesso! Verifique seu e-mail.");
      setEmail("");
      setSenha("");
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Cadastro</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <br />
        <button type="submit">Cadastrar</button>
        <nav>
          <Link to="/login">Já tem conta criada? Faça login</Link>
        </nav>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
