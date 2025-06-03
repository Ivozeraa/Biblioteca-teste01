import { Carrossel } from "../components/Carrossel";

import S from './styles/Inicio.module.css'

import { Livro } from '../components/Livro'

import biblia from '../assets/livros/biblia.webp'
import hobbit from '../assets/livros/hobbit.jpg'
import catecismo from '../assets/livros/catecismo.webp'
import republica from '../assets/livros/republica.jpg'
import confissoes from '../assets/livros/confissoes.jpg'

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
            nome='Catecismo da I.C'
            capa={catecismo}
            editora="CNBB"
            isbn='853494671X' />

          <Livro
            nome='A República'
            capa={republica}
            editora="LaFonte"
            isbn='853494671X' />

          <Livro
            nome='Confissões'
            capa={confissoes}
            editora="Penguim"
            isbn='853494671X' />
        </div>
      </div>

      <main className={S.main}>
        <h2>Recém Adicionados</h2>
      </main>
    </div>
  );
}