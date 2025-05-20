export default class Livro {
  constructor(titulo, autor, isbn) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.disponivel = true;
  }

  estaDisponivel() {
    return this.disponivel;
  }

  emprestar() {
    if (!this.disponivel) throw new Error("Livro já emprestado");
    this.disponivel = false;
  }

  devolver() {
    this.disponivel = true;
  }
}
