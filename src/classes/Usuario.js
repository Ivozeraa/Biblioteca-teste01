export default class Usuario {
  constructor(nome, id) {
    this.nome = nome;
    this.id = id;
    this.livrosEmprestados = [];
  }

  emprestarLivro(livro) {
    this.livrosEmprestados.push(livro);
  }
}