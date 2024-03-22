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
          <Route path="/movieDescription" element={<MovieDescriptionPage />} />
          <Route path="/cinemaPage" element={<CinemaPage />} />
          <Route path="/ticketBooking" element={<TicketbookingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
