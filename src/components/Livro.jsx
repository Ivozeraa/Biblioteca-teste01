import { useEffect } from 'react'
import S from './styles/Livro.module.css'

export const Livro = ({ nome, autor, capa, editora }) => {
  return (
    <div className={S.livro}>
        <p className={S.nome}>{nome}</p>
      <img src={capa} alt="" />
      <div className={S.infor}>
        <p>Editora: {editora}</p>
      </div>
    </div>
  )
}
