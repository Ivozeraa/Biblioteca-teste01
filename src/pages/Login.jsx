import { useState } from "react";
import { supabase } from "../../SupabaseClient";
import { Link, useNavigate } from "react-router-dom";
import styles from './styles/auth.module.css';

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("Login falhou: " + error.message);
    } else {
      console.log("Usuário logado:", data.user);
      setErro("");
      navigate("/"); 
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login Page</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className={styles.input}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit" className={styles.button}>Entrar</button>
        <nav className={styles.navButton}>
          <Link to="/register">Não tem conta criada? Registre-se</Link>
        </nav>
      </form>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}
