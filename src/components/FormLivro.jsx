import { useState } from 'react';

export default function FormLivro({ onAddLivro }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [isbn, setIsbn] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!titulo || !autor || !isbn) return;
    onAddLivro({ titulo, autor, isbn });
    setTitulo(''); setAutor(''); setIsbn('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 class='title'>Cadastrar Livro</h3>
      <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
      <input placeholder="Autor" value={autor} onChange={e => setAutor(e.target.value)} />
      <input placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} />
      <button type="submit">Adicionar</button>
    </form>
  );
}
