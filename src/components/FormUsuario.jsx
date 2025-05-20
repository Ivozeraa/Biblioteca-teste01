import { useState } from 'react';

export default function FormUsuario({ onAddUsuario }) {
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');
  const [tipo, setTipo] = useState('Aluno');

  function handleSubmit(e) {
    e.preventDefault();
    if (!nome || !id) return;
    onAddUsuario({ nome, id, tipo });
    setNome(''); setId(''); setTipo('Aluno');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cadastrar Usuário</h3>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input placeholder="ID" value={id} onChange={e => setId(e.target.value)} />
      <select value={tipo} onChange={e => setTipo(e.target.value)}>
        <option>Aluno</option>
        <option>Professor</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>
  );
}