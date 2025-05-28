import { useState, useRef, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

import S from './styles/User.module.css';

export const IconUser = () => {
  const [menuAberto, setMenuAberto] = useState(false);
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
        <ul>
          <li><a href="#inicio">Início</a></li>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>
    </div>
  );
};
