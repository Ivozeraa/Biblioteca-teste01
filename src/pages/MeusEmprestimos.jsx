import React, { useState } from "react";

export const MeusEmprestimos = () => {
  const[livrosEmprestados, setEmprestar] = useState(0)

   function Emprestar() {
    setEmprestar(livrosEmprestados + 1); 
  }

  return (
    <>
      <div>MeusEmprestimos</div>
      <h1>Quantidade Emprestada: {livrosEmprestados}</h1>
      <button onClick={Emprestar}>Emprestar livro</button>
    </>
  );
};
