import S from '../styles/Header.module.css'

import logo from '../assets/logo.png'

import { Menu } from '../components/Menu'
import { IconUser } from '../components/IconUser'

export const Header = () => {
  return (
    <header className={S.header}>
      <div className={S.branding}>
        <img src={logo} alt="logo" />
        <h1>Alexandria</h1>
      </div>

      <nav className={S.nav}>
        <Menu />
        <IconUser />
      </nav>

    </header>
  )
}
