import Livro from './Livro';
import Emprestimo from './Emprestimo';

export default class Biblioteca {
  constructor() {
    this.livros = [];
    this.usuarios = [];
    this.emprestimos = [];
  }

  cadastrarLivro(livro) {
    this.livros.push(livro);
  }

  cadastrarUsuario(usuario) {
    this.usuarios.push(usuario);
  }

  realizarEmprestimo(usuarioId, isbn) {
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    const livro = this.livros.find(l => l.isbn === isbn);
    if (!livro || !livro.estaDisponivel()) throw new Error("Livro indisponível");
    livro.emprestar();
    usuario.emprestarLivro(livro);
    this.emprestimos.push(new Emprestimo(usuario, livro));
  }
}
