import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import Translation from './components/Translation/Translation';
import Store from './store';
import './style.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Store>
      <Translation>
        <App />
      </Translation>
    </Store>
  </React.StrictMode>,
);
