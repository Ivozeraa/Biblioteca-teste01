import { useState } from "react";
import { supabase } from "../../SupabaseClient";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/auth.module.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false); // 👈 novo estado
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    toast.info("Processando cadastro...");

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      toast.error("❌ Erro: " + error.message);
    } else {
      toast.success("✅ Conta criada com sucesso! Verifique seu e-mail.");
      setEmail("");
      setSenha("");
      navigate("/login");
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} />
      <div className={styles.container}>
        <h1 className={styles.title}>Cadastro</h1>
        <form onSubmit={handleRegister} className={styles.form}>

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className={styles.passwordInput}>
              
            </div>
            <input
              className={styles.input}
              type={mostrarSenha ? "text" : "password"} // 👈 alterna tipo
              placeholder="Digite sua senha"
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

          <button type="submit" className={styles.button}>
            Cadastrar
          </button>
          <nav className={styles.navButton}>
            <Link to="/login">Já tem conta? Faça login</Link>
          </nav>
        </form>
      </div>
    </>
  );
}
