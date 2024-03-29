import logo from "./logo.svg";
import "./App.css";
import React from "react";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/SignUp";
import UserProfilePage from "./Pages/ProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoviePage from "./Pages/MoviePage";
import MovieDescriptionPage from "./Pages/MovieDescriptionPage";
import CinemaPage from "./Pages/CinemaPage";
import TicketbookingPage from "./Pages/TicketbookingPage";
import MovieCinemaPage from "./Pages/MovieCinemaPage";
import CinemaMovie from "./Pages/CinemaMoviePage";
import CinemaDescriptionPage from "./Pages/CinemaDescriptionPage";
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
          <Route path="/movieDescription/:movieId" element={<MovieDescriptionPage />} />
          <Route path="/cinemaDescription/:cinemaId" element={<CinemaDescriptionPage />} />
          <Route path="/cinemaPage" element={<CinemaPage />} />
          <Route path="/ticketBooking" element={<TicketbookingPage />} />
          <Route path="/movieCinema" element={<MovieCinemaPage />} />
          <Route path="/cinemaMovie" element={<CinemaMovie />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
