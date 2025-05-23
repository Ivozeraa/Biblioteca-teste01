import S from "../styles/Menu.module.css"
 
export const Menu = () => {
  return (
    <div className={S.menu}>
      <ul>
        <li>Início</li>
        <li>Buscar Livros</li>
        <li>Meus Empréstimos</li>
        <li>Reservas</li>
      </ul>
    </div>
  )
}
