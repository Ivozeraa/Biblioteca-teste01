import { useState, useEffect } from 'react'
import { Carrossel } from "../components/Carrossel"
import { adicionarLivro } from '../utils/addlivro'
import { buscarLivrosRecentes } from '../utils/livrosRecentes'

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
  const [recentes, setRecentes] = useState([])

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

  useEffect(() => {
    async function iniciar() {
      await adicionarLivro() // se essa função faz sentido aqui
      const livrosRecentes = await buscarLivrosRecentes()
      setRecentes(livrosRecentes)
    }
    iniciar()
  }, [])

  return (
    <div className={S.inicio}>
      <Carrossel />

      <section className={S.principaisLivros}>
        <h2>Principais Livros</h2>
        <div className={S.livros}>
          {livros.map((livro) => (
            <Livro
              key={livro.isbn || livro.nome}
              nome={livro.nome}
              capa={livro.capa}
              autor={livro.autor}
              editora={livro.editora}
              isbn={livro.isbn}
              onClick={() => setLivroSelecionado(livro)}
            />
          ))}
        </div>
      </section>

      <main className={S.main}>
        <h2>Recém Adicionados</h2>
        <div className={S.livros}>
          {recentes.length === 0 ? (
            <p>Nenhum livro recente encontrado.</p>
          ) : (
            recentes.map((livro) => (
              <Livro
                key={livro.isbn || livro.nome}
                nome={livro.nome}
                capa={livro.capa}
                autor={livro.autor}
                editora={livro.editora}
                isbn={livro.isbn}
                onClick={() => setLivroSelecionado(livro)}
              />
            ))
          )}
        </div>
      </main>

      {livroSelecionado && (
        <LivroCard livro={livroSelecionado} onClose={() => setLivroSelecionado(null)} />
      )}
    </div>
  )
}
