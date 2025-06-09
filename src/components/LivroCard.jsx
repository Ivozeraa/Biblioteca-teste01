import { useEffect, useState, useRef } from 'react';
import styles from './styles/LivroCard.module.css';

export const LivroCard = ({ livro, onClose, onRemover }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!livro) return;

    const handleBodyScroll = () => {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    };

    const handleEsc = (e) => e.key === 'Escape' && onClose();

    handleBodyScroll();
    window.addEventListener('keydown', handleEsc);
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [livro, onClose]);

  useEffect(() => {
    if (livro && modalRef.current) {
      modalRef.current.focus();
    }
  }, [livro]);

  const handleRemoverClick = () => {
    if (window.confirm(`Tem certeza que deseja remover "${livro.nome}"?`)) {
      onRemover(livro.isbn);
      onClose();
    }
  };

  if (!livro) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-livro"
    >
      <div
        className={styles.card}
        onClick={e => e.stopPropagation()}
        ref={modalRef}
        tabIndex={-1}
      >
        <button
          className={styles.fechar}
          onClick={onClose}
          aria-label="Fechar modal"
          type="button"
        >
          &times;
        </button>

        <header className={styles.header}>
          <h2 id="titulo-livro" className={styles.titulo}>{livro.nome}</h2>
        </header>

        <div className={styles.content}>
          <div className={styles.left}>
            <img
              src={livro.capa || 'https://via.placeholder.com/150?text=Sem+Capa'}
              alt={`Capa do livro ${livro.nome}`}
              className={styles.capa}
              loading="lazy"
              width="150"
              height="225"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=Sem+Capa';
              }}
            />
          </div>

          <div className={styles.right}>
            <p><strong>Autor:</strong> {livro.autor || 'Não informado'}</p>
            <p><strong>Editora:</strong> {livro.editora || 'Não informada'}</p>
            <p><strong>ISBN:</strong> {livro.isbn}</p>
            <p><strong>Categoria:</strong> {livro.categoria || 'Não categorizado'}</p>
          </div>
        </div>

        <div className={styles.descricaoContainer}>
          <h3 className={styles.descricaoTitulo}>Descrição</h3>
          <p className={styles.descricao}>
            {livro.descricao || 'Descrição não disponível.'}
          </p>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={handleRemoverClick}
            aria-label={`Remover livro ${livro.nome}`}
            className={`${styles.btn} ${styles.btnRemover}`}
          >
            Remover Livro
          </button>
        </div>
      </div>
    </div>
  );
};
