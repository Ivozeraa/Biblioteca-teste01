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
        to="/buscarLivros"
        end
        className={({ isActive }) => (isActive ? 'link ativo' : 'link')}
      >
        Buscar Livros

      </NavLink>

      <NavLink
        to="/meusEmprestimos"
        end
        className={({ isActive }) => (isActive ? 'link ativo' : 'link')}
      >
        Meus Empréstimos

      </NavLink>

      <NavLink
        to="/reservas"
        end
        className={({ isActive }) => (isActive ? 'link ativo' : 'link')}
      >
        Reservas

      </NavLink>








      {/* <li>Buscar Livros</li>
        <li>Meus Empréstimos</li>
        <li>Reservas</li> */}
    </nav>
  )
}
