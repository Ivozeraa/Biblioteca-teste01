import { useState } from "react";
import { supabase } from "../../SupabaseClient";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/auth.module.css";

import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { toast } from "react-toastify";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false); 

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("Login falhou: " + error.message);
    } else {
      setErro("");
      if(!error){

      }
      toast.success("Login feito com sucesso.");
      navigate("/");
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Login Page</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <p
              type="button"
              onClick={() => setMostrarSenha((prev) => !prev)}
              className={styles.togglePassword}
            >
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </p>
          </div>

          {erro && <p className={styles.error}>{erro}</p>}

          <button type="submit" className={styles.button}>
            Entrar
          </button>
          <nav className={styles.navButton}>
            <Link to="/register">Não tem conta? Registre-se</Link>
          </nav>
        </form>
      </div>
    </>
  );
}
