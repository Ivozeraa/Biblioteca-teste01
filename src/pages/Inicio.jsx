import { Carrossel } from "../components/Carrossel";

import S from './styles/Inicio.module.css'

import { Livro } from '../components/Livro'

import biblia from '../assets/livros/biblia.jpg'
import hobbit from '../assets/livros/hobbit.webp'

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
            editora="Ave Maria"
            isbn='853494671X' />

          <Livro
            nome='O Hobbit'
            capa={hobbit}
            editora="HarperCollins"
            isbn='853494671X' />

          <Livro
            nome='Bíblia Sagrada'
            capa={biblia}
            editora="Editora Ave Maria"
            isbn='853494671X' />

          <Livro
            nome='Bíblia Sagrada'
            capa={biblia}
            editora="Editora Ave Maria"
            isbn='853494671X' />

          <Livro
            nome='Bíblia Sagrada'
            capa={biblia}
            editora="Editora Ave Maria"
            isbn='853494671X' />
        </div>
      </div>

      <main className={S.main}>
        <h2>Recem adicionados</h2>
      </main>
    </div>
  );
}