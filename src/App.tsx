import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import './index.css'
import FavouritesPage from './pages/FavouritesPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Navigation/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/favorites' element={<FavouritesPage />} />
      </Routes>
    </>
  );
}

export default App;
