import styles from './styles/LivroCard.module.css'
import { supabase } from '../../SupabaseClient'

export const LivroCard = ({ livro, onClose }) => {
  if (!livro) return null

const pegarEmprestado = async () => {
  if (!livro?.id) {
    alert('Erro: Livro inválido ou incompleto.')
    return
  }

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError

    const { error } = await supabase
      .from('emprestimos')
      .insert([{
        user_id: user.id,
        livro_id: livro.id,
        data_emprestimo: new Date().toISOString(),
        devolvido: false
      }])

    if (error) {
      console.error('Erro ao pegar emprestado:', error)
      alert('Falha ao pegar o livro emprestado. Tente de novo.')
    } else {
      alert('Livro emprestado com sucesso!')
    }
  } catch (err) {
    console.error('Erro geral:', err)
    alert('Erro inesperado. Tente novamente.')
  }
}


  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <button className={styles.fechar} onClick={onClose}>×</button>
        <img src={livro.capa} alt={livro.nome} />
        <h2>{livro.nome}</h2>
        <p><strong>Editora:</strong> {livro.editora}</p>
        <p><strong>ISBN:</strong> {livro.isbn}</p>
        <p className={styles.desc}>Descrição do livro pode ser adicionada aqui.</p>

        <button onClick={pegarEmprestado} className={styles.pegarBotao}>
          Pegar Emprestado
        </button>
      </div>
    </div>
  )
}
