import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Films from "./page/films";
import SelectedFilm from "./page/selectedFilm"
import Login from "./page/login"
import Home from "./page/home"
import Register from "./page/register"

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Films />} />
            <Route path="/films/:id" element={<SelectedFilm />} /> {/* Add the route for films/id */}
            <Route path="/login" element={<Login />} /> {/* Add the route for login */}
            <Route path="/register" element={<Register />} /> {/* Add the route for login */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
