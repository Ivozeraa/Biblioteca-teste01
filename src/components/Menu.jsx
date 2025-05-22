import S from "../styles/Menu.module.css"
 
export const Menu = () => {
  return (
    <div className={S.menu}>
      <ul>
        <li>Início</li>
        <li>Emprestados</li>
        <li>Listas</li>
        <li>Sobre</li>
      </ul>
    </div>
  )
}
