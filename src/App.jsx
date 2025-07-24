import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
// import Summary from './components/Summary/Summary';
// import History from './components/History/History';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/amrap" element={<WorkoutCard />} /> */}
        {/* <Route path="/wod" element={<WorkoutCard />} />
        <Route path="/emom" element={<WorkoutCard />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/history" element={<History />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
