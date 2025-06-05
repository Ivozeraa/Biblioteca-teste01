import { createContext, useState, useContext, useMemo, useEffect } from 'react';

const LivrosContext = createContext();

const LIVROS_STORAGE_KEY = 'livrosAppStorage';

export const LivrosProvider = ({ children }) => {
  const [livros, setLivros] = useState(() => {
    // Tentar carregar do localStorage na inicialização do estado
    const storedLivros = localStorage.getItem(LIVROS_STORAGE_KEY);
    return storedLivros ? JSON.parse(storedLivros) : [];
  });

  // Sempre que livros mudar, atualiza o localStorage
  useEffect(() => {
    localStorage.setItem(LIVROS_STORAGE_KEY, JSON.stringify(livros));
  }, [livros]);

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
