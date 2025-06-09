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
        emprestado: livro.emprestado || false,
        dataEmprestimo: livro.dataEmprestimo || null,
      }));

    setLivrosFiltrados(filtrados);

    if (livroSelecionado) {
      const livroAtualizado = livros.find(l => l.isbn === livroSelecionado.isbn);
      if (livroAtualizado) {
        setLivroSelecionado({
          ...livroSelecionado,
          emprestado: livroAtualizado.emprestado || false,
          dataEmprestimo: livroAtualizado.dataEmprestimo || null,
        });
      }
    }
  }, [livros, busca, categoria, livroSelecionado]);

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
          aria-label="Buscar livro"
        />
        <div className={S.filtro}>
          <select
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
            aria-label="Filtrar por categoria"
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
            <option value="religioso">Religioso</option>
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
              descricao={livro.descricao}
              emprestado={livro.emprestado}
              onClick={() => abrirLivro(livro)}
              onRemover={handleRemover}
            />
          ))
        )}
      </div>

      <LivroCard
        livro={livroSelecionado}
        onClose={fecharLivro}
        onRemover={handleRemover}
      />

    </div>
  );
};
