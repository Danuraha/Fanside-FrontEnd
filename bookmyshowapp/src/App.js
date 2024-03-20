import logo from './logo.svg';
import './App.css';
import React from 'react';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/Login';
import SignupPage from './Pages/SignUp';
import UserProfilePage from './Pages/ProfilePage';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import MoviePage from './Pages/MoviePage';

function App() {
  return (
   <div>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/movies" element={<MoviePage />} />
      </Routes>
    </Router>
    
   
   </div>
  );
}

export default App;
