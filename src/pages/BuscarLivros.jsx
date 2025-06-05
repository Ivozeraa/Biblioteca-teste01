import { useState, useEffect } from 'react'
import { useLivros } from '../context/LivrosContext'
import S from './styles/BuscarLivros.module.css'
import { Livro as LivroComponent } from '../components/Livro' // componente visual
import { Livro as LivroModel } from '../models/Livro' // classe lógica

export const BuscarLivros = () => {
  const { livros } = useLivros()
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('')
  const [livrosFiltrados, setLivrosFiltrados] = useState([])

  useEffect(() => {
    const filtrados = livros
      .map(livro => new LivroModel(livro))
      .filter(livro => livro.matchesBusca(busca, categoria))

    setLivrosFiltrados(filtrados)
  }, [livros, busca, categoria])

  return (
    <div className={S.buscarLivros}>
      <div className={S.search}>
        <input
          type="search"
          placeholder="Buscar livro"
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />

        <div className={S.filtro}>
          <select
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            <option value="fantasia">Fantasia</option>
            <option value="romance">Romance</option>
            <option value="terror">Terror</option>
            <option value="aventura">Aventura</option>
            <option value="ficcao-cientifica">Ficção Científica</option>
            <option value="drama">Drama</option>
            <option value="suspense">Suspense</option>
            <option value="historico">Histórico</option>
          </select>
        </div>
      </div>

      <div className={S.listaLivros}>
        {livrosFiltrados.length === 0 ? (
          <p>Nenhum livro encontrado.</p>
        ) : (
          livrosFiltrados.map((livro, i) => (
            <LivroComponent
              key={i}
              nome={livro.nome}
              autor={livro.autor}
              capa={livro.getCapaPadrao()}
              editora={livro.editora}
              isbn={livro.isbn}
            />
          ))
        )}
      </div>
    </div>
  )
}
