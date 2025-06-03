import { useState } from 'react'
import { Carrossel } from "../components/Carrossel"

import S from './styles/Inicio.module.css'

import { Livro } from '../components/Livro'
import { LivroCard } from '../components/LivroCard'

import biblia from '../assets/livros/biblia.webp'
import hobbit from '../assets/livros/hobbit.jpg'
import catecismo from '../assets/livros/catecismo.webp'
import republica from '../assets/livros/republica.jpg'
import confissoes from '../assets/livros/confissoes.jpg'

export function Inicio() {
  const [livroSelecionado, setLivroSelecionado] = useState(null)

  const livros = [
    {
      nome: 'Bíblia Sagrada',
      capa: biblia,
      autor: 'Indefinido',
      editora: 'Paulus',
      isbn: '853494671X',
    },
    {
      nome: 'O Hobbit',
      capa: hobbit,
      autor: 'J.R.R. Tolkien',
      editora: 'HarperCollins',
      isbn: '853494671X',
    },
    {
      nome: 'Catecismo da I.C',
      capa: catecismo,
      editora: 'CNBB',
      autor: 'Indefinido',
      isbn: '853494671X',
    },
    {
      nome: 'A República',
      capa: republica,
      editora: 'LaFonte',
      autor: 'Platão',
      isbn: '853494671X',
    },
    {
      nome: 'Confissões',
      capa: confissoes,
      editora: 'Penguim Company',
      autor: 'Santo Agostinho',
      isbn: '853494671X',
    },
  ]

  return (
    <div className={S.inicio}>
      <Carrossel />
      <div className={S.principaisLivros}>
        <h2>Principais Livros</h2>
        <div className={S.livros}>
          {livros.map((livro, i) => (
            <Livro
              key={i}
              {...livro}
              onClick={() => setLivroSelecionado(livro)}
            />
          ))}
        </div>
      </div>

      <main className={S.main}>
        <h2>Recém Adicionados</h2>
      </main>

      <LivroCard livro={livroSelecionado} onClose={() => setLivroSelecionado(null)} />
    </div>
  )
}
