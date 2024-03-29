import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Films from "./page/films";
import SelectedFilm from "./page/selectedFilm"
import Login from "./page/login"
import Home from "./page/home"
import Register from "./page/register"
import Gallery from "./page/gallery"
import Profile from "./page/profile"

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
            <Route path="/gallery" element={<Gallery />} /> {/* Add the route for gallery */}
            <Route path="/profile" element={<Profile />} /> {/* Add the route for gallery */}

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
