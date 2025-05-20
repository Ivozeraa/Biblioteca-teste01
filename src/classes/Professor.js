import Usuario from "./Usuario.js";

export default class Professor extends Usuario {
  constructor(nome, matricula) {
    super(nome, matricula);
    this.tipo = "Professor";
    this.limiteDias = 10;
  }

  getTipo() {
    return this.tipo;
  }

  getLimiteDias() {
    return this.limiteDias;
  }
}