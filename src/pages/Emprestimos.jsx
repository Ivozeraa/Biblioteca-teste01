import { useState } from 'react';
import { useLivros } from '../context/LivrosContext';
import { Livro as LivroComponent } from '../components/Livro';
import { LivroCard } from '../components/LivroCard';
import S from './styles/Emprestimos.module.css';

export function Emprestimos() {
  const { livros, removerLivro, devolverLivro } = useLivros();

  // Filtra apenas os livros que estão emprestados
  const livrosEmprestados = livros.filter((livro) => livro.emprestado);

  const [livroSelecionado, setLivroSelecionado] = useState(null);

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

  const handleDevolver = (isbn) => {
    devolverLivro(isbn);
    fecharLivro(); // Fecha o card para remover da tela automaticamente
  };


  return (
    <div className={S.emprestimos}>
      <h2>Meus Empréstimos</h2>
      <div className={S.listaLivros}>
        {livrosEmprestados.length === 0 ? (
          <p>Você não tem livros emprestados.</p>
        ) : (
          livrosEmprestados.map((livro) => (
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

      {livroSelecionado && (
        <LivroCard
          livro={livroSelecionado}
          onClose={fecharLivro}
          onRemover={handleRemover}
          onDevolver={handleDevolver}
          mostrarApenasDevolver={true}
        />
      )}
    </div>
  );
}
