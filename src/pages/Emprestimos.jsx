import { useLivros } from '../context/LivrosContext';
import S from './styles/Emprestimos.module.css';

export function Emprestimos() {
  const { livros } = useLivros();
  const livrosEmprestados = livros.filter((l) => l.emprestado);

  return (
    <div className={S.emprestimos}>
      <h1>Meus Empréstimos</h1>
      {livrosEmprestados.length === 0 ? (
        <p>Você não tem livros emprestados.</p>
      ) : (
        livrosEmprestados.map((livro) => (
          <div key={livro.isbn} className={S.livro}>
            <h2>{livro.nome}</h2>
            <p>Emprestado em: {new Date(livro.dataEmprestimo).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
