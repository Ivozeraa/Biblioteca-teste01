import { createContext, useState, useContext, useMemo } from 'react';

const LivrosContext = createContext();

const livrosPadrao = [
  {
    nome: 'A Bíblia Sagrada',
    autor: 'Diversos autores',
    editora: 'Paulus',
    isbn: '9788531110393',
    categoria: 'religioso',
    descricao: 'O livro sagrado do Cristianismo, composto por Antigo e Novo Testamento.',
    capa: 'https://upload.wikimedia.org/wikipedia/commons/5/57/B%C3%ADblia_de_Jerusal%C3%A9m_Paulus.jpg',
    predefinido: true,
  },
  {
    nome: 'O Senhor dos Anéis',
    autor: 'J.R.R. Tolkien',
    editora: 'Martins Fontes',
    isbn: '9780000000003',
    categoria: 'fantasia',
    descricao: 'A épica jornada pela Terra Média.',
    capa: 'https://m.media-amazon.com/images/I/71ZLavBjpRL._AC_UF1000,1000_QL80_.jpg',
    predefinido: true,
  },
  {
    nome: 'O Hobbit',
    autor: 'J.R.R. Tolkien',
    editora: 'HarperCollins Brasil',
    isbn: '9788595084742',
    categoria: 'fantasia',
    descricao: 'A aventura de Bilbo Bolseiro em uma jornada inesperada pela Terra Média.',
    capa: 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg',
    predefinido: true,
  },
  {
  },
   {
    nome: 'O Catecismo da Igreja Católica',
    autor: 'Igreja Católica',
    editora: 'Loyola',
    isbn: '9788515025879',
    categoria: 'religioso',
    descricao: 'Compilação oficial da doutrina da Igreja Católica sobre fé, sacramentos, moral e oração.',
    capa: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSAxEurdpWLodv_dtHrsssyktpfcRkV8TaSiJu8HeD6vKqv-8DQ27TP9hOjfXehs6_KqGeSKJpckpWe_H_Rfit9O0RN9bCRXDhFnidnO8c&usqp=CAc',
    predefinido: true,
  },
  {
    nome: 'Harry Potter e a Pedra Filosofal',
    autor: 'J.K. Rowling',
    editora: 'Rocco',
    isbn: '9780000000005',
    categoria: 'fantasia',
    descricao: 'O início da jornada do bruxo mais famoso.',
    capa: 'https://covers.openlibrary.org/b/isbn/9780000000005-M.jpg',
    predefinido: true,
  }
];

export const LivrosProvider = ({ children }) => {
  const [livros, setLivros] = useState([...livrosPadrao]);

  const adicionarLivro = (livro) => {
    setLivros(prev => [livro, ...prev]);
  };

  const removerLivro = (isbn) => {
    setLivros(prev => prev.filter(livro => livro.isbn !== isbn));
  };

  const value = useMemo(() => ({ livros, adicionarLivro, removerLivro }), [livros]);

  return (
    <LivrosContext.Provider value={value}>
      {children}
    </LivrosContext.Provider>
  );
};

export const useLivros = () => {
  const context = useContext(LivrosContext);
  if (!context) throw new Error('useLivros deve ser usado dentro de um LivrosProvider');
  return context;
};
