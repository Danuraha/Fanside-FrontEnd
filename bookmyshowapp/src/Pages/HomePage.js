import { AppBar, Typography, Grid, Button } from "@mui/material";
import React from "react";
import Img from "./../images/Cinema.jpeg";
import PrimarySearchAppBar from "../Components/AppBar";
import TitlebarBelowImageList from "../Components/Cardlists";
import { useNavigate } from "react-router-dom"; // Import for navigation
import CinemaCardList from "../Components/CinemaCardLists";
import './HomePage.css'
function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/movies"); // Navigate to login page on button click
  };
  const handleCinemaClick = () => {
    navigate("/CinemaPage"); // Navigate to login page on button click
  };
  return (
    <Grid sx={{backgroundColor:'#f2d9fa'}}> 
      <PrimarySearchAppBar />
      <Grid
      container
      style={{
        backgroundImage: `url(${Img})`,
        backgroundSize: "cover",
        width: "100%",
        height: "350px",
        position: "relative", // Add position relative for absolute positioning of text
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "100%",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "5rem",
            animation: "fadeIn 2s ease-in-out", // Using fadeIn animation
          }}
        >
          Welcome to Book My Show
        </h1>
      </div>
    </Grid>
      <Grid sx={{ marginTop: "20px" }}>
        <Typography
          fontSize={"22px"}
          sx={{ marginLeft: "40px", marginBottom: "-50px", fontWeight: "bold" }}
        >
          Latest Movies
        </Typography>
        <Button
          sx={{ marginLeft: "89vw", marginBottom: "-50px" }}
          onClick={handleClick}
        >
          See More
        </Button>
        <TitlebarBelowImageList />
      </Grid>
      <Grid sx={{ marginTop: "20px" }}>
        <Typography
          fontSize={"22px"}
          sx={{ marginLeft: "40px", marginBottom: "-50px", fontWeight: "bold" }}
        >
          Top Cinemas
        </Typography>
        <Button
          sx={{ marginLeft: "89vw", marginBottom: "-50px" }}
          onClick={handleCinemaClick}
        >
          See More
        </Button>

        <CinemaCardList />
      </Grid>
    </Grid>
  );
}
export default HomePage;
