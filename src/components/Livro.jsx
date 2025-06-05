import { useState } from 'react';
import S from './styles/Livro.module.css';
import { LivroCard } from './LivroCard';

export const Livro = ({ nome, autor, capa, editora, isbn, onClick, onRemover }) => {
  const [mostrarCard, setMostrarCard] = useState(false);

  const abrirCard = () => setMostrarCard(true);
  const fecharCard = () => setMostrarCard(false);

  return (
    <>
      <div className={S.livro} onClick={abrirCard}>
        <p className={S.nome}>{nome}</p>
        <img src={capa} alt={nome} />
        <div className={S.infor}>
          <p>Autor: {autor}</p>
        </div>
      </div>

      {mostrarCard && (
        <LivroCard
          livro={{ nome, autor, capa, editora, isbn }}
          onClose={fecharCard}
          onRemover={onRemover}  // repassa o onRemover para o card
        />
      )}
    </>
  );
};
