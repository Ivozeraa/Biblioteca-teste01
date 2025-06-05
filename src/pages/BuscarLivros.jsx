import { useState, useEffect } from 'react';
import { useLivros } from '../context/LivrosContext';
import S from './styles/BuscarLivros.module.css';
import { Livro as LivroComponent } from '../components/Livro';
import { Livro as LivroModel } from '../models/Livro';
import { LivroCard } from '../components/LivroCard';

export const BuscarLivros = () => {
  const { livros, removerLivro } = useLivros();
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [livrosFiltrados, setLivrosFiltrados] = useState([]);

  useEffect(() => {
    const filtrados = livros
      .map(livroData => new LivroModel(livroData))
      .filter(livro => livro.matchesBusca(busca, categoria))
      .map(livro => ({
        nome: livro.nome,
        autor: livro.autor,
        capa: livro.getCapaPadrao(),
        editora: livro.editora,
        isbn: livro.isbn,
        categoria: livro.categoria,
        descricao: livro.descricao,
      }));

    setLivrosFiltrados(filtrados);
  }, [livros, busca, categoria]);

  const abrirLivro = (livro) => {
    setLivroSelecionado(livro);
  };

  const fecharLivro = () => {
    setLivroSelecionado(null);
  };

  const handleRemover = (isbn) => {
    removerLivro(isbn);
    fecharLivro();
  };

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
          livrosFiltrados.map(livro => (
            <LivroComponent
              key={livro.isbn}
              nome={livro.nome}
              autor={livro.autor}
              capa={livro.capa}
              editora={livro.editora}
              isbn={livro.isbn}
              categoria={livro.categoria}
              onClick={() => abrirLivro(livro)}
              onRemover={handleRemover}
            />
          ))
        )}
      </div>
    </div>
  );
};
