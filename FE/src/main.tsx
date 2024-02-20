import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MantineProvider } from '@mantine/core';
import { AuthContextProvider } from './context/authContext.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </MantineProvider>
  </React.StrictMode>
);
