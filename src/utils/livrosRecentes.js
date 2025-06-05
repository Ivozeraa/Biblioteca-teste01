import { supabase } from '../../SupabaseClient';

export async function buscarLivrosRecentes() {
  const { data, error } = await supabase
    .from('livros')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Erro ao buscar livros:', error);
    return [];
  }

  return data;
}
