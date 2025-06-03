import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css'
import { LivrosProvider } from './context/LivrosContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LivrosProvider>
      <App />
    </LivrosProvider>
  </React.StrictMode>
);
