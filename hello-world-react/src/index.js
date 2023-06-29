import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> // can cause useEffect to run twice
    <App />
  // </React.StrictMode>
);

// do not touch this file. the root is App.js