import Usuario from './Usuario';

export class Aluno extends Usuario {
  constructor(nome, id) {
    super(nome, id);
  }
}

export class Professor extends Usuario {
  constructor(nome, id) {
    super(nome, id);
  }
}