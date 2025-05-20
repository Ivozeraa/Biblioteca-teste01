import { useState } from 'react';

export default function Emprestimo({ usuarios, livros, onEmprestar }) {
  const [usuarioId, setUsuarioId] = useState('');
  const [isbn, setIsbn] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!usuarioId || !isbn) return;
    onEmprestar(usuarioId, isbn);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Realizar Empréstimo</h3>
      <select value={usuarioId} onChange={e => setUsuarioId(e.target.value)}>
        <option value="">Selecione Usuário</option>
        {usuarios.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
      </select>
      <select value={isbn} onChange={e => setIsbn(e.target.value)}>
        <option value="">Selecione Livro</option>
        {livros.filter(l => l.estaDisponivel()).map(l => (
          <option key={l.isbn} value={l.isbn}>{l.titulo}</option>
        ))}
      </select>
      <button type="submit">Emprestar</button>
    </form>
  );
}