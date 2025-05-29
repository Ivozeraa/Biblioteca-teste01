import { Carrossel } from "../components/Carrossel";

import S from './styles/Inicio.module.css'

export function Inicio() {
  return (
    <div className={S.inicio}>
      <Carrossel />
      <div className={S.principaisLivros}>
        <h2>Principais livros</h2>
        <div className={S.livros}>
          <div className={S.livro}>
            <p>nome</p>
            <p>editora</p>
          </div>
        </div>
      </div>
    </div>
  );
}