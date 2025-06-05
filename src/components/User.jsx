import { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { supabase } from '../../SupabaseClient';
import S from "./styles/User.module.css";
import { toast } from "react-toastify";

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
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        if (session.user.user_metadata?.foto) {
          setUserPhoto(session.user.user_metadata.foto);
        }
      }
    };
    getSession();
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setIsLoggedIn(true);
        if (session?.user.user_metadata?.foto) {
          setUserPhoto(session.user.user_metadata.foto);
        }
        toast.success("Usuário logado com sucesso!");
        navigate("/");
      }
      if (event === "SIGNED_OUT") {
        setIsLoggedIn(false);
        setUserPhoto(null);
        toast.dark("✅ - Você saiu da conta.");
        navigate("/");
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuAberto(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setMenuAberto(false);
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
            <>
              <NavLink
                to="/AddLivro"
                end
                className={({ isActive }) => (isActive ? 'link ativo' : 'link')}
                onClick={() => setMenuAberto(false)}
              >
                Adicionar Livro
              </NavLink>
              <button style={{ color: 'red' }} onClick={handleLogout}>
                Sair
              </button>
            </>
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
