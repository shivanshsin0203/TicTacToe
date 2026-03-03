import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import App from './App.tsx'
import Register from './register.tsx';
import Login from './login.tsx';
import Dashboard from './dashboard.tsx';
import GameRoom from './gameroom.tsx';
import WatchParty from './watchparty.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gameroom/:id/:uniqueId" element={<GameRoom />} />
        <Route path="/watchparty/:id" element={<WatchParty />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
