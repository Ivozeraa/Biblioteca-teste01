import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleUpdatePassword = async () => {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setMessage('Erro: ' + error.message)
    } else {
      setMessage('Senha atualizada com sucesso!')
    }
  }

  return (
    <div>
      <h2>Atualizar Senha</h2>
      <input 
        type="password"
        placeholder="Nova senha"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />
      <button onClick={handleUpdatePassword}>Atualizar Senha</button>
      <p>{message}</p>
    </div>
  )
}

export default ResetPassword
