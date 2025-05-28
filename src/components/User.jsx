import { useState, useRef, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

import { NavLink } from 'react-router-dom'

import S from './styles/User.module.css';

export const IconUser = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickFora = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };

    document.addEventListener('mousedown', handleClickFora);
    return () => {
      document.removeEventListener('mousedown', handleClickFora);
    };
  }, []);

  return (
    <div className={S.user} ref={menuRef}>
      <FaUser className={S.icon} onClick={() => setMenuAberto(!menuAberto)} />

      <nav className={`${S.userNav} ${menuAberto ? S.userNavAberto : ''}`}>
        <div className={S.login}>
          {isLoggedIn ? (
            <NavLink style={{ color: 'red' }}>
              Sair
            </NavLink>
          ) : (
            <NavLink onClick={() => setIsLoggedIn(true)} className="btn-login">
              Fazer Login
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
};
