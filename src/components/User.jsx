import { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";

import S from "./styles/User.module.css";

export const IconUser = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
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
        setUserPhoto(user.user_metadata.foto);
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

      <nav className={`${S.userNav} ${menuAberto ? S.userNavAberto : ""}`}>
        <ul>
          <li>
            <a href="#inicio">Início</a>
          </li>
          <li>
            <a href="#sobre">Sobre</a>
          </li>
          <li>
            <a href="#contato">Contato</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
