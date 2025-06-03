import styles from './styles/LivroCard.module.css'

export const LivroCard = ({ livro, onClose }) => {
  if (!livro) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <button className={styles.fechar} onClick={onClose}>×</button>
        <img src={livro.capa} alt={livro.nome} />
        <h2>{livro.nome}</h2>
        <p><strong>Editora:</strong> {livro.editora}</p>
        <p><strong>ISBN:</strong> {livro.isbn}</p>
        <p className={styles.desc}>Descrição do livro pode ser adicionada aqui.</p>
      </div>
    </div>
  )
}
