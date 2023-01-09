import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { useInit } from './hooks/useInit';
import Store from './store';
import './style.css';

const Init: React.FC = () => {
  useInit();
  return null;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Store>
      <Init />
      <App />
    </Store>
  </React.StrictMode>,
);
