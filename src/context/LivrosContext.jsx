import { createContext, useState, useContext, useMemo, useEffect } from 'react';

const LivrosContext = createContext();

const livrosPreDefinidos = [
  {
    nome: "A Bíblia Sagrada",
    autor: "Diversos autores",
    editora: "Paulus",
    isbn: "9788531110393",
    categoria: "religioso",
    descricao: "O livro sagrado do Cristianismo, composto por Antigo e Novo Testamento.",
    capa: "https://upload.wikimedia.org/wikipedia/commons/5/57/B%C3%ADblia_de_Jerusal%C3%A9m_Paulus.jpg",
    predefinido: true
  },
  {
    nome: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    editora: "Martins Fontes",
    isbn: "9780000000003",
    categoria: "fantasia",
    descricao: "A épica jornada pela Terra Média.",
    capa: "https://m.media-amazon.com/images/I/71ZLavBjpRL._AC_UF1000,1000_QL80_.jpg",
    predefinido: true
  },
  {
    nome: "O Hobbit",
    autor: "J.R.R. Tolkien",
    editora: "HarperCollins Brasil",
    isbn: "9788595084742",
    categoria: "fantasia",
    descricao: "A aventura de Bilbo Bolseiro em uma jornada inesperada pela Terra Média.",
    capa: "https://m.media-amazon.com/images/I/91M9xPIf10L.jpg",
    predefinido: true
  },
  {
    nome: "O Catecismo da I.C.",
    autor: "Igreja Católica",
    editora: "Loyola",
    isbn: "9788515025879",
    categoria: "religioso",
    descricao: "Compilação oficial da doutrina da Igreja Católica sobre fé, sacramentos, moral e oração.",
    capa: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSAxEurdpWLodv_dtHrsssyktpfcRkV8TaSiJu8HeD6vKqv-8DQ27TP9hOjfXehs6_KqGeSKJpckpWe_H_Rfit9O0RN9bCRXDhFnidnO8c&usqp=CAc",
    predefinido: true
  },
  {
    nome: "Confissões",
    autor: "Santo Agostinho",
    editora: "Editora Loyola",
    isbn: "9788515032406",
    categoria: "filosofia",
    descricao: "Uma autobiografia espiritual que é uma das obras mais importantes da literatura cristã.",
    capa: "", // substitua por uma capa válida
    predefinido: true
  }
];

// Dentro de LivrosProvider, após `removerLivro`:
const emprestarLivro = (isbn) => {
  setLivrosUsuario((prev) => {
    const existe = prev.find(l => l.isbn === isbn);
    if (existe) {
      return prev.map(l => l.isbn === isbn ? { ...l, emprestado: true } : l);
    }
    // Se for pré-definido, adiciona uma entrada "emprestado" ao usuário
    if (livrosPreDefinidos.some(l => l.isbn === isbn)) {
      return [...prev, { isbn, emprestado: true }];
    }
    return prev;
  });
};

const devolverLivro = (isbn) => {
  setLivrosUsuario((prev) =>
    prev.map(l =>
      l.isbn === isbn ? { ...l, emprestado: false } : l
    )
  );
};


const CHAVE_LOCALSTORAGE = 'livrosUsuario';

export const LivrosProvider = ({ children }) => {
  const [livrosUsuario, setLivrosUsuario] = useState(() => {
    const dados = localStorage.getItem(CHAVE_LOCALSTORAGE);
    return dados ? JSON.parse(dados) : [];
  });

  useEffect(() => {
    const somenteLivrosUsuario = livrosUsuario.filter(l => {
      if (l.removido && livrosPreDefinidos.some(lp => lp.isbn === l.isbn)) {
        return false;
      }
      return true;
    });

    localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(somenteLivrosUsuario));
  }, [livrosUsuario]);

  const livros = useMemo(() => {
    const isbnsRemovidos = livrosUsuario
      .filter(l => l.removido)
      .map(l => l.isbn);

    const livrosAdicionados = livrosUsuario.filter(l => !l.removido && !livrosPreDefinidos.some(lp => lp.isbn === l.isbn));

    const livrosFixosVisiveis = livrosPreDefinidos
      .filter(l => !isbnsRemovidos.includes(l.isbn))
      .map(l => {
        const dadosUsuario = livrosUsuario.find(u => u.isbn === l.isbn);
        return dadosUsuario ? { ...l, ...dadosUsuario } : l;
      });

    return [...livrosFixosVisiveis, ...livrosAdicionados];
  }, [livrosUsuario]);

  const adicionarLivro = (novoLivro) => {
    setLivrosUsuario(prev => [...prev, { ...novoLivro }]);
  };

  const removerLivro = (isbn) => {
    if (livrosPreDefinidos.some(l => l.isbn === isbn)) {
      setLivrosUsuario(prev => {
        if (prev.some(l => l.isbn === isbn && l.removido)) return prev;
        return [...prev, { isbn, removido: true }];
      });
    } else {
      setLivrosUsuario(prev => prev.filter(l => l.isbn !== isbn));
    }
  };

  const emprestarLivro = (isbn) => {
    setLivrosUsuario(prev => {
      const index = prev.findIndex(l => l.isbn === isbn);
      if (index !== -1) {
        const novo = [...prev];
        novo[index] = {
          ...novo[index],
          emprestado: true,
          dataEmprestimo: new Date().toISOString()
        };
        return novo;
      }
      return [...prev, {
        isbn,
        emprestado: true,
        dataEmprestimo: new Date().toISOString()
      }];
    });
  };

  const devolverLivro = (isbn) => {
    setLivrosUsuario(prev => {
      const index = prev.findIndex(l => l.isbn === isbn);
      if (index !== -1) {
        const novo = [...prev];
        novo[index] = {
          ...novo[index],
          emprestado: false,
          dataEmprestimo: null
        };
        return novo;
      }
      return [...prev, {
        isbn,
        emprestado: false,
        dataEmprestimo: null
      }];
    });
  };

  const valorContexto = useMemo(() => ({
    livros,
    adicionarLivro,
    removerLivro,
    emprestarLivro,
    devolverLivro,
  }), [livros]);


  return (
    <LivrosContext.Provider value={valorContexto}>
      {children}
    </LivrosContext.Provider>
  );
};

export const useLivros = () => {
  const contexto = useContext(LivrosContext);
  if (!contexto) throw new Error('useLivros deve ser usado dentro de um LivrosProvider');
  return contexto;
};
