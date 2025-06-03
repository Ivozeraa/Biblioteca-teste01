import { useState } from 'react'
import { supabase } from '../supabase/client'

function PasswordReset() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleReset = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/reset-password'
    })

    if (error) {
      setMessage('Erro: ' + error.message)
    } else {
      setMessage('Email de recuperação enviado! Confira sua caixa de entrada.')
    }
  }

  return (
    <div>
      <h2>Recuperar Senha</h2>
      <input 
        type="email" 
        placeholder="Digite seu email" 
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleReset}>Enviar Email</button>
      <p>{message}</p>
    </div>
  )
}

export default PasswordReset
