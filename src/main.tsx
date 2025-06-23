// frontend/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRouter from './routes/AppRouter';
import './index.css'; // Pastikan ini mengimpor Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  </React.StrictMode>,
);