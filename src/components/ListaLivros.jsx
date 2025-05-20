export default function ListaLivros({ livros }) {
  return (
    <div>
      <h3>Livros</h3>
      <ul>
        {livros.map(l => (
          <li key={l.isbn}>{l.titulo} - {l.autor} - {l.estaDisponivel() ? 'Disponível' : 'Emprestado'}</li>
        ))}
      </ul>
    </div>
  );
}
