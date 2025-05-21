import S from '../styles/Header.module.css'

import logo from '../assets/logo.png'

export const Header = () => {
  return (
    <header className={S.header}>
      <div className={S.branding}>
        <img src={logo} alt="" />
        <h1>Alexandria</h1>
      </div>
    </header>
  )
}
