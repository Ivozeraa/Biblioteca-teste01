import { useState } from 'react';
import { useLivros } from '../context/LivrosContext';
import { useNavigate } from 'react-router-dom';
import { Carrossel } from "../components/Carrossel";
import S from './styles/Inicio.module.css';

import { Livro } from '../components/Livro';
import { LivroCard } from '../components/LivroCard';
import { Autores } from '../components/Autores'

export function Inicio() {
  const [isbnSelecionado, setIsbnSelecionado] = useState(null);
  const { livros, removerLivro, emprestarLivro } = useLivros();
  const navigate = useNavigate();

  const livroSelecionado = livros.find((livro) => livro.isbn === isbnSelecionado);

  const livrosRecentes = livros.slice(0, 5);
  const principaisLivros = livros.filter(livro => livro.predefinido);

  const handleRemoverLivro = (isbn) => {
    removerLivro(isbn);
    setIsbnSelecionado(null);
  };

  const handleEmprestarLivro = (isbn) => {
    emprestarLivro(isbn);
    setIsbnSelecionado(null);
    navigate('/emprestimos');  // navega para a página de empréstimos
  };

  return (
    <div className={S.inicio}>
      <Carrossel />

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
                onClick={() => setIsbnSelecionado(livro.isbn)}
                onRemover={handleRemoverLivro}
              />
            ))
          )}
        </div>
      </section>

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
                onClick={() => setIsbnSelecionado(livro.isbn)}
                onRemover={handleRemoverLivro}
              />
            ))
          )}
        </div>
      </main>

      <div classname={S.autores}> 
        <h2>Principais Autores</h2>
        <Autores/>

      </div>


      <LivroCard
        livro={livroSelecionado}
        onClose={() => setIsbnSelecionado(null)}
        onRemover={handleRemoverLivro}
        onEmprestar={handleEmprestarLivro}
      />
    </div>
  );
}
