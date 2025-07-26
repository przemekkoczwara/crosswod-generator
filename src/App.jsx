import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Amrap from './components/Amrap/Amrap';
import Wod from './components/Wod/Wod';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/amrap" element={<Amrap />} />
        <Route path="/wod" element={<Wod />} />
        {/* <Route path="/summary" element={<Summary />} />
        <Route path="/history" element={<History />} />  */}
      </Routes>
    </BrowserRouter>
  );
}
