import { useEffect } from 'react'
import S from './styles/Livro.module.css'

export const Livro = ({ nome, autor, isbn, capa, editora }) => {
  return (
    <div className={S.livro}>
      <img src={capa} alt="" />
      <p><strong>{nome}</strong></p>
      <p>{autor}</p>
      <p>{editora}</p>
      <p>{isbn}</p>
    </div>
  )
}
