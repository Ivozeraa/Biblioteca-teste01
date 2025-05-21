import S from "../styles/Menu.module.css"
 
export const Menu = () => {
  return (
    <div className={S.menu}>
      <ul>
        <li>Início</li>
        <li>Sobre</li>
        <li>Sla</li>
        <li>Contatos</li>
      </ul>
    </div>
  )
}
