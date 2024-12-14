import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { initializeConnection } from './lib/supabase';
import App from './App';
import './index.css';

// Initialize Supabase connection
initializeConnection().catch(console.error);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-right" />
    <App />
  </StrictMode>
);