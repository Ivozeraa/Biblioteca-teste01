import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { supabase } from '../../SupabaseClient';
import S from "./styles/User.module.css";

export const IconUser = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickFora = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        const user = session.user;
        if (user?.user_metadata?.foto) {
          setUserPhoto(user.user_metadata.foto);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUserPhoto(null);
    setMenuAberto(false);
    navigate('/'); 
  };

  const handleLoginClick = () => {
    navigate('/login');  
  };

  return (
    <div className={S.user} ref={menuRef}>
      {userPhoto ? (
        <img
          src={`${userPhoto}?t=${new Date().getTime()}`}
          alt="Foto do usuário"
          className={S.fotoUsuario}
          onClick={() => setMenuAberto(!menuAberto)}
        />
      ) : (
        <FaUser className={S.icon} onClick={() => setMenuAberto(!menuAberto)} />
      )}

      <nav className={`${S.userNav} ${menuAberto ? S.userNavAberto : ''}`}>
        <div className={S.login}>
          {isLoggedIn ? (
            <button style={{ color: 'red' }} onClick={handleLogout}>
              Sair
            </button>
          ) : (
            <button onClick={handleLoginClick} className="btn-login">
              Fazer Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};
