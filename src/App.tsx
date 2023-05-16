import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Films from "./page/films";
import Home from "./page/home"

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Films />} />

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
