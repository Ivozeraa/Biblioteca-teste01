import S from './styles/Livro.module.css'

export const Livro = ({titulo, editora, isbn} = props) => {
  return (
    <div className={S.livro}>
      <h2>{titulo}</h2>
      <p>{editora}</p>
      isbn
    </div>
  )
}
