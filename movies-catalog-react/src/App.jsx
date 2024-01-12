// En App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieCatalog from './components/MovieCatalog';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<MovieCatalog />} />
          <Route path='/movie/:movieId' element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
