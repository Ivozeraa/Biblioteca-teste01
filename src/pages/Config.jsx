import { useState } from 'react';
import { supabase } from '../../SupabaseClient';
import styles from './styles/config.module.css';

export const Config = () => {
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!imagem) {
      setMensagem('⚠️ Selecione uma imagem primeiro!');
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setMensagem('❌ Usuário não autenticado!');
      return;
    }

    const userId = user.id;
    const fileExt = imagem.name.split('.').pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    const { error } = await supabase
      .storage
      .from('user-photos')
      .upload(filePath, imagem);

    if (error) {
      setMensagem('❌ Erro ao fazer upload: ' + error.message);
      return;
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('user-photos')
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl }
    });

    if (updateError) {
      setMensagem('❌ Erro ao atualizar perfil: ' + updateError.message);
    } else {
      setMensagem('✅ Foto de perfil atualizada com sucesso!');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reservas</h2>
      <form onSubmit={handleUpload} className={styles.form}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImagemChange} 
          className={styles.inputFile}
        />
        {preview && (
          <div className={styles.previewContainer}>
            <img 
              src={preview} 
              alt="Preview" 
              className={styles.previewImage}
            />
          </div>
        )}
        <button 
          type="submit" 
          className={styles.button}
        >
          Enviar
        </button>
      </form>
      {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
    </div>
  );
};
