import { useEffect } from 'react'
import S from './styles/Livro.module.css'

export const Livro = ({ nome, autor, isbn, capa, editora }) => {
  return (
    <div className={S.livro}>
      <img src={capa} alt="" />
      <div className={S.infor}>
        <p className={S.nome}>{nome}</p>
        <p>Editora: {editora}</p>
        <p>{isbn}</p>
      </div>
    </div>
  )
}
