import { useState } from "react";
import { supabase } from "../../SupabaseClient";
import { Link } from "react-router-dom";
import styles from './styles/auth.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro</h1>
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          className={styles.input}
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>Cadastrar</button>
        <nav className={styles.navButton}>
          <Link to="/login">Já tem conta criada? Faça login</Link>
        </nav>
      </form>
      {mensagem && <p style={{ marginTop: '1rem', color: '#fcd34d' }}>{mensagem}</p>}
    </div>
  );
}
