import { Carrossel } from "../components/Carrossel";

import S from './styles/Inicio.module.css'

import { Livro } from '../components/Livro'

import biblia from '../assets/livros/biblia.jpg'

export function Inicio() {
  return (
    <div className={S.inicio}>
      <Carrossel />
      <div className={S.principaisLivros}>
        <h2>Principais Livros</h2>
        <div className={S.livros}>
          <Livro 
            nome='Bíblia Sagrada' 
            capa={biblia} 
            editora="Editora Ave Maria"
            isbn='853494671X'/>
        </div>
      </div>
    </div>
  );
}