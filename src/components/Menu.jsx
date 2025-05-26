import S from "./styles/Menu.module.css"

import { NavLink } from 'react-router-dom'

export const Menu = () => {
  return (
    <nav className={S.menu}>
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? 'link ativo' : 'link')}
      >
        Início

      </NavLink>

      <NavLink
        to="/Livros"
        end
        className={({ isActive }) => (isActive ? 'link ativo' : 'link')}
      >
        Buscar Livros

      </NavLink>

      <NavLink
        to="/Emprestimos"
        end
        className={({ isActive }) => (isActive ? 'link ativo' : 'link')}
      >
        Meus Empréstimos

      </NavLink>

      <NavLink
        to="/Reservas"
        end
        className={({ isActive }) => (isActive ? 'link ativo' : 'link')}
      >
        Reservas

      </NavLink>

    </nav>
  )
}
