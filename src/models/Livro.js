export class Livro {
  constructor({ nome, autor, capa, editora, isbn, categoria }) {
    this.nome = nome;
    this.autor = autor;
    this.capa = capa;
    this.editora = editora;
    this.isbn = isbn;
    this.categoria = categoria;
  }

  getNomeAutor() {
    return `${this.nome} ${this.autor}`;
  }

  getResumo() {
    return `${this.nome} de ${this.autor}, publicado pela ${this.editora}.`;
  }

  getCapaPadrao() {
    return this.capa || 'https://via.placeholder.com/150';
  }

  matchesBusca(busca, categoria) {
    const nomeAutor = this.getNomeAutor().toLowerCase();
    const buscaVal = busca.toLowerCase();
    const categoriaVal = categoria.toLowerCase();

    const correspondeBusca = nomeAutor.includes(buscaVal);
    const correspondeCategoria = categoriaVal ? this.categoria.toLowerCase() === categoriaVal : true;

    return correspondeBusca && correspondeCategoria;
  }
}
