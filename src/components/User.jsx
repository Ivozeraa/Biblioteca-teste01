import { NavLink } from 'react-router-dom'
import { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { supabase } from "../../SupabaseClient"; 

import S from "./styles/User.module.css";

export const IconUser = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef(null);

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
    const fetchUserFoto = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Erro ao buscar usuário:", error);
        return;
      }

      const user = data?.user;

      if (user && user.user_metadata?.foto) {
        const path = user.user_metadata.foto; 
        const { data: publicData } = supabase
          .storage
          .from('user-photos') 
          .getPublicUrl(path);

        if (publicData?.publicUrl) {
          setUserPhoto(publicData.publicUrl);
        } else {
          console.warn("URL pública não encontrada para o path:", path);
        }
      }
    };

    fetchUserFoto();
  }, []);

  return (
    <div className={S.user} ref={menuRef}>
      {userPhoto ? (
        <img
          src={userPhoto}
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
