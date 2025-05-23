import { useState } from 'react';
import Livro from '../classes/Livro';
import { Aluno, Professor } from '../classes/Aluno';
import Biblioteca from '../classes/Biblioteca';
import FormLivro from "../components/FormLivro";
import FormUsuario from '../components/FormUsuario';
import ListaLivros from '../components/ListaLivros';
import ListaUsuarios from '../components/ListaUsuarios';
import Emprestimo from '../components/Emprestimo';
import { Header } from '../components/Header';
import { Content } from './Content'


const biblioteca = new Biblioteca();

export function Main() {
  const [livros, setLivros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  function addLivro({ titulo, autor, isbn }) {
    const novoLivro = new Livro(titulo, autor, isbn);
    biblioteca.cadastrarLivro(novoLivro);
    setLivros([...biblioteca.livros]);
  }

  function addUsuario({ nome, id, tipo }) {
    const novoUsuario = tipo === 'Aluno' ? new Aluno(nome, id) : new Professor(nome, id);
    biblioteca.cadastrarUsuario(novoUsuario);
    setUsuarios([...biblioteca.usuarios]);
  }

  function handleEmprestimo(usuarioId, isbn) {
    try {
      biblioteca.realizarEmprestimo(usuarioId, isbn);
      setLivros([...biblioteca.livros]);
      setUsuarios([...biblioteca.usuarios]);
      alert('Empréstimo realizado com sucesso');
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div>
      <Header />
      <Content />
    </div>
  );
}