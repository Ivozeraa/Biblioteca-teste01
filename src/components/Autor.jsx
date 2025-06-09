import S from './styles/Autor.module.css';

export const Autor = ({ imagem, nome, descricao }) => {
  return (
    <div className={S.autorCard}>
      <img src={imagem} alt={nome} />
      <h3>{nome}</h3>
      <p>{descricao}</p>
    </div>
  );
};


