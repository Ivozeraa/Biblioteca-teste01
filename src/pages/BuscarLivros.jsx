import S from './styles/BuscarLivros.module.css'

export const BuscarLivros = () => {
  return (
    <div className={S.buscarLivros}>
      <div className={S.search}>
        <input type="search" placeholder="Buscar livro" />
        
        <div className={S.filtro}>
          <select>
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
    </div>
  )
}
