import { useState, useEffect } from 'react'
import { useLivros } from '../context/LivrosContext'
import S from './styles/BuscarLivros.module.css'
import { Livro } from '../components/Livro'  // importe o componente Livro

export const BuscarLivros = () => {
  const { livros } = useLivros()
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('')
  const [livrosFiltrados, setLivrosFiltrados] = useState([])

  useEffect(() => {
    const filtrados = livros.filter((livro) => {
      const nomeAutor = (livro.nome + ' ' + livro.autor).toLowerCase()
      const buscaVal = busca.toLowerCase()
      const categoriaVal = categoria.toLowerCase()

      const correspondeBusca = nomeAutor.includes(buscaVal)
      const correspondeCategoria = categoriaVal ? livro.categoria.toLowerCase() === categoriaVal : true

      return correspondeBusca && correspondeCategoria
    })
    setLivrosFiltrados(filtrados)
  }, [livros, busca, categoria])

  const handleBuscaChange = (e) => setBusca(e.target.value)
  const handleCategoriaChange = (e) => setCategoria(e.target.value)

  return (
    <div className={S.buscarLivros}>
      <div className={S.search}>
        <input
          type="search"
          placeholder="Buscar livro"
          value={busca}
          onChange={handleBuscaChange}
        />
        <div className={S.filtro}>
          <select value={categoria} onChange={handleCategoriaChange}>
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
          livrosFiltrados.map((livro, index) => (
            <Livro
              key={index}
              nome={livro.nome}
              autor={livro.autor}
              capa={livro.capa}
              editora={livro.editora}
              isbn={livro.isbn}
            />
          ))
        )}
      </div>
    </div>
  )
}
