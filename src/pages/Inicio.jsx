import { useState } from 'react';
import { useLivros } from '../context/LivrosContext';
import { Carrossel } from "../components/Carrossel";
import S from './styles/Inicio.module.css';

import { Livro } from '../components/Livro';

export function Inicio() {
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const { livros, removerLivro } = useLivros();

  const livrosRecentes = livros.slice(0, 5);
  const principaisLivros = livros.filter(livro => livro.predefinido);

  const handleRemoverLivro = (isbn) => {
    removerLivro(isbn);
    setLivroSelecionado(null);
  };

  return (
    <div className={S.inicio}>
      <Carrossel />

      <main className={S.main}>
        <h2>Recém Adicionados</h2>
        <div className={S.livros}>
          {livrosRecentes.length === 0 ? (
            <p>Nenhum livro recente encontrado.</p>
          ) : (
            livrosRecentes.map((livro) => (
              <Livro
                key={livro.isbn || livro.nome}
                {...livro}
                onClick={() => setLivroSelecionado(livro)}
                onRemover={handleRemoverLivro}
              />
            ))
          )}
        </div>
      </main>

      <section className={S.principaisLivros}>
        <h2>Principais Livros</h2>
        <div className={S.livros}>
          {principaisLivros.length === 0 ? (
            <p>Nenhum livro principal disponível.</p>
          ) : (
            principaisLivros.map((livro) => (
              <Livro
                key={livro.isbn || livro.nome}
                {...livro}
                onClick={() => setLivroSelecionado(livro)}
                onRemover={handleRemoverLivro}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
