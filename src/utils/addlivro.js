import { supabase } from '../../SupabaseClient'

export async function adicionarLivro() {
  const { error } = await supabase
    .from('livros')
    .insert([{
      nome: 'O Senhor dos Anéis',
      editora: 'Martins Fontes',
      isbn: '978-8533613379',
      capa: 'https://link-da-capa.com/capa.jpg'
    }])

  if (error) {
    console.error('Erro ao adicionar livro:', error)
  } else {
    console.log('Livro adicionado com sucesso!')
  }
}
