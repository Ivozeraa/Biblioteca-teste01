import { useEffect } from 'react'
import styles from './styles/LivroCard.module.css' // seu CSS, ajuste o caminho se precisar

export const LivroCard = ({ livro, onClose, onRemover }) => {
  // Bloqueia o scroll do body quando o card está aberto
  useEffect(() => {
    if (livro) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [livro]);

  if (!livro) return null;

  const handleRemoverClick = () => {
    if (window.confirm(`Tem certeza que deseja remover o livro "${livro.nome}"?`)) {
      onRemover(livro.isbn);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <button
          className={styles.fechar}
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>

        <img
          src={livro.capa}
          alt={`Capa do livro ${livro.nome}`}
          className={styles.capa}
        />

        <h2>{livro.nome}</h2>
        <p><strong>Autor:</strong> {livro.autor}</p>
        <p><strong>Editora:</strong> {livro.editora}</p>
        <p><strong>ISBN:</strong> {livro.isbn}</p>
        <p><strong>Categoria:</strong> {livro.categoria}</p>

        <p className={styles.descricao}>
          {livro.descricao || 'Descrição do livro não disponível.'}
        </p>

        <button
          onClick={handleRemoverClick}
          className={styles.removerBotao}
          style={{
            marginTop: '10px',
            backgroundColor: '#e74c3c',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Remover Livro
        </button>
      </div>
    </div>
  );
};
