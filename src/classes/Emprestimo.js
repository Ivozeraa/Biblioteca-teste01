import { differenceInDays } from 'date-fns';

export default class Emprestimo {
  constructor(usuario, livro) {
    this.usuario = usuario;
    this.livro = livro;
    this.dataEmprestimo = new Date();
    this.dataDevolucao = null;
  }

  devolverLivro() {
    this.dataDevolucao = new Date();
    this.livro.devolver();
    return this.calcularMulta();
  }

  calcularMulta() {
    const dias = differenceInDays(this.dataDevolucao, this.dataEmprestimo);
    const atraso = dias - 7;
    return atraso > 0 ? atraso * 1.5 : 0;
  }
}
