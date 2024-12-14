import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Pix from './pages/Pix';
import PixQRCode from './pages/PixQRCode';
import Profile from './pages/Profile';
import TidioChat from './components/chat/TidioChat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/pix" element={<Pix />} />
          <Route path="/pix-qr" element={<PixQRCode />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <TidioChat />
    </BrowserRouter>
  );
}

export default App;