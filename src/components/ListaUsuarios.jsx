export default function ListaUsuarios({ usuarios }) {
  return (
    <div>
      <h3>Usuários</h3>
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>{u.nome} ({u.constructor.name}) - Livros emprestados: {u.livrosEmprestados.length}</li>
        ))}
      </ul>
    </div>
  );
}
