export class Livro {
  constructor({ nome, autor, capa, editora, isbn, categoria, descricao }) {
    this.nome = nome;
    this.autor = autor;
    this.capa = capa;
    this.editora = editora;
    this.isbn = isbn;
    this.categoria = categoria;
    this.descricao = descricao;

    this.emprestado = false;
    this.usuarioEmprestimo = null;
    this.dataEmprestimo = null;
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

  emprestarPara(usuario) {
    if (this.emprestado) {
      throw new Error(`O livro "${this.nome}" já está emprestado.`);
    }
    this.emprestado = true;
    this.usuarioEmprestimo = usuario;
    this.dataEmprestimo = new Date();
  }

  devolver() {
    if (!this.emprestado) {
      throw new Error(`O livro "${this.nome}" não está emprestado.`);
    }
    this.emprestado = false;
    this.usuarioEmprestimo = null;
    this.dataEmprestimo = null;
  }
}
