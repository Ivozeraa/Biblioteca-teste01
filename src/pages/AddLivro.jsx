import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLivros } from '../context/LivrosContext';
import S from './styles/AddLivro.module.css';

export const AddLivro = () => {
  const navigate = useNavigate();
  const { adicionarLivro } = useLivros();

  const [dados, setDados] = useState({
    nome: '',
    autor: '',
    capa: '',
    editora: '',
    isbn: '',
    categoria: '',
    descricao: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setDados((prev) => ({
      ...prev,
      [name]: name === 'categoria' ? value.toLowerCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se todos os campos foram preenchidos
    for (const key in dados) {
      if (!dados[key]) {
        alert(`Preencha o campo: ${key}`);
        return;
      }
    }

    try {
      await adicionarLivro(dados);
      navigate('/livros');
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
      alert('Erro ao adicionar livro.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={S.formContainer}>
      <h2>Adicionar Livro</h2>
      <div className={S.inputs}>
        <div className={S.principal}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={dados.nome}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="autor"
            placeholder="Autor"
            value={dados.autor}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="capa"
            placeholder="URL da capa"
            value={dados.capa}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="editora"
            placeholder="Editora"
            value={dados.editora}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={dados.isbn}
            onChange={handleChange}
            required
          />
        </div>
        <div className={S.secundario}>
          <select
            name="categoria"
            value={dados.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="fantasia">Fantasia</option>
            <option value="romance">Romance</option>
            <option value="terror">Terror</option>
            <option value="aventura">Aventura</option>
            <option value="ficcao-cientifica">Ficção Científica</option>
            <option value="drama">Drama</option>
            <option value="suspense">Suspense</option>
            <option value="historico">Histórico</option>
          </select>
          <textarea
            name="descricao"
            placeholder="Descrição do livro"
            value={dados.descricao}
            onChange={handleChange}
            required
          />

          <button type="submit">Adicionar</button>
        </div>
      </div>
    </form>
  );
};
