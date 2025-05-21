import S from '../styles/Header.module.css'

import logo from '../assets/logo.png'

import { Menu } from '../components/Menu'

export const Header = () => {
  return (
    <header className={S.header}>
      <div className={S.branding}>
        <img src={logo} alt="" />
        <h1>Alexandria</h1>
      </div>

      <Menu />
    </header>
  )
}
