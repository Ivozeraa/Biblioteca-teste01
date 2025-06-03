import { createContext, useState, useContext, useMemo } from 'react';

const LivrosContext = createContext();

export const LivrosProvider = ({ children }) => {
  const [livros, setLivros] = useState([]);

  const adicionarLivro = (livro) => {
    setLivros((prevLivros) => [...prevLivros, livro]);
  };

  const value = useMemo(() => ({ livros, adicionarLivro }), [livros]);

  return (
    <LivrosContext.Provider value={value}>
      {children}
    </LivrosContext.Provider>
  );
};

export const useLivros = () => {
  const context = useContext(LivrosContext);
  if (!context) {
    throw new Error('useLivros deve ser usado dentro de um LivrosProvider');
  }
  return context;
};
