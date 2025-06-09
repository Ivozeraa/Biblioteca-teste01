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
    capa: "data:image/webp;base64,UklGRuoXAABXRUJQVlA4IN4XAABwSgCdASp2AKYAPnEYnE4koSSkmiCQDglB1wBRBKiu8mx9hufArbs3Lzsq+lLcG+ZnzgNOI3qq0suEX5PwP8ifxX959CfFX2E/QfqJ9jfQXtQ/n+8/5U6gvt/zxXt+m3oF+7X2fzmPs/Mz7T/9fpu/6HhT/hP+N7An58/6n3AfLl/5eYz9g/3n/x9wj9fvTk9if7q+yL+3I/+i2EmYUuufDT6D4IfcQyGV9vGU+exzr1HipTo4v7YW/v32EhudEgaDkajeUiqJgXAkpDISGUd4bwgfsi/aFlSitKJ2UCSJ7x7121EWio5jzfEVrLeUFzLwpyDkzhWY63s35s/tShKAdMgnwf1EQGGTdVLDNzKNstGml/LdGgVgowUUHrXHb/TxxAIXKFQjnfd/Yro79a56QuXLas7JQ5WsyuLQ3JAG7zteZsqN/4/DCJTWFok0/NJ73xWXp7wWqdZ8IKl2UwX77nBSQt9mOFK0LcM8J7Y7D6ipdiQiZGWLkHLXFhwjR6WPd+lSi5HUw1OKPyeWcHcsihWmCr0qKcebwwFe4/pHELqPHp9jhgSP4IVsiH5+5J5L6xoXG2g9CZMncNA5Mq46RTYowgKXPIvSc9Ir/xUWdlXdgYy0jnG6RhVh5+V1fyDCn4/6tqpl1bUIVfQWXvH+qM3PbyF1XwbSdw9xBJ9yi+8oHO/CyrQ8upWUCCCDRYJR9nXkGquR6DuuUxt5hADUbxD42EfZ/jTlLxe5/5i9CFGG7SCIN8oEtjgBaE4u0Lg8vJR3qiAGSdfPMJPrrMzPnREzW8zMaPHEOw8AAP74ojAxTV/xUjd1F7zf/WAA6CzxMqMcCuMzP4xk5hNSvEijLOCNVtPqWP7O0E3t5Y8FSsIeCro1dbR/s16LNrludPKXsBx/HTR+NXDgeyAN5gJC/Pz27mbR/ooFJaoqecLtEG4kGgF7C7hqvsJ/AOlGi/YPwYh8Ria44e0Rsyd7LYpxvyNWagM/V6pQJe0GgDDqq6EHmbwa73Vgq6vQI4W8DD1/6JWigYC9DtEtg85HVgu6YXT2kVRrOGV0a69FEmbyBZPJ4kQLYDMhaJ5QsmqMe6+3HFU8UWgQTd94MjFCoRWFKQ9doO2uXlfah7VWCe0O3aymliwGpFHW8UjxL278bXTEjE/Z85xtug8rcfqFFMVMgxY3TYXHYkQcqqGaY19wFuDzDe+VIZ0dU/mgrx69emXl5ZBFzb3Mw4ibof2AQwjCjBwwQFvT4jOJEMPILgoF9bNjvSP+AtVo3GGSbMMxHb9aQ6n9OAISBJFkPz+ZW9NGJxoaVER5OPQlkYggon63ADkyNc2A4J5IDtG8ftXiA5+Y/Gl6dOS0cKO9VD4Y1ZAlTYPpwDikZl5FqMJbthQhHhzA4ejoNRDG5TLyx82RGdwrVxxsUbG0fqRpykzlhuqOHQyoebGUk9f/a5RoPDxqzmuTnoSP/nw+yWKt5zevd0SnbYypcHeSfHZjZxhTzM081/LmUij1fQRAYGw9ZmwSchNN0ErwjKjvUA09eTRvcgrWJ5eqcRSh3q/+b+8GJkupswE0gyYCD4OEo+cE/YZk3fUxltyeBlTlkgsQPJ5VFCtWvdxV4eNJK/KlVPwrntA10J27fiiTBM4wyEmwZeuYFdpyIskE284fEOq1AzPtbHDbRtKZi/GTOJOjvwFjpGBjua+C5Pa7uDH+MX4vFTD",
    predefinido: true
  }
];

const CHAVE_LOCALSTORAGE = 'livrosUsuario';

export const LivrosProvider = ({ children }) => {
  const [livrosUsuario, setLivrosUsuario] = useState(() => {
    const dados = localStorage.getItem(CHAVE_LOCALSTORAGE);
    return dados ? JSON.parse(dados) : [];
  });

  // MODIFICAÇÃO AQUI: filtra para não salvar remoções de livros pré-definidos no localStorage
  useEffect(() => {
    const somenteLivrosUsuario = livrosUsuario.filter(l => {
      if (l.removido && livrosPreDefinidos.some(lp => lp.isbn === l.isbn)) {
        return false; // não salva remoção de livro pré-definido
      }
      return true;
    });

    localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(somenteLivrosUsuario));
  }, [livrosUsuario]);

  const livros = useMemo(() => {
    const isbnsRemovidos = livrosUsuario
      .filter(l => l.removido)
      .map(l => l.isbn);

    const livrosAdicionados = livrosUsuario.filter(l => !l.removido);

    const livrosFixosVisiveis = livrosPreDefinidos.filter(l => !isbnsRemovidos.includes(l.isbn));

    return [...livrosFixosVisiveis, ...livrosAdicionados];
  }, [livrosUsuario]);

  const adicionarLivro = (novoLivro) => {
    setLivrosUsuario((prev) => [...prev, { ...novoLivro }]);
  };

  const removerLivro = (isbn) => {
    if (livrosPreDefinidos.some(l => l.isbn === isbn)) {
      setLivrosUsuario((prev) => {
        if (prev.some(l => l.isbn === isbn && l.removido)) return prev;
        return [...prev, { isbn, removido: true }];
      });
    } else {
      setLivrosUsuario((prev) => prev.filter(l => l.isbn !== isbn));
    }
  };

  const valorContexto = useMemo(() => ({
    livros,
    adicionarLivro,
    removerLivro,
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
