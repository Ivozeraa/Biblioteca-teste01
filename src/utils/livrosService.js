import { supabase } from '../../SupabaseClient';

export const adicionarLivro = async (dados) => {
  const { nome, autor, capa, editora, isbn, categoria, descricao } = dados;

  const { error } = await supabase
    .from('livros')
    .insert([
      {
        nome,
        autor,
        capa,
        editora,
        categoria,
        descricao
      }
    ]);

  if (error) {
    console.error('Erro ao inserir livro:', error);
    throw error;
  }
};
