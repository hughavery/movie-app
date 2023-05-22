import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Films from "./page/films";
import SelectedFilm from "./page/selectedFilm"
import Home from "./page/home"

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Films />} />
            <Route path="/films/:id" element={<SelectedFilm />} /> {/* Add the route for films/id */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
