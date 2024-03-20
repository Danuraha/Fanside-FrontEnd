import { AppBar, Typography, Grid, Button } from "@mui/material";
import React from "react";
import Img from "./../images/Theatre.jpeg";
import PrimarySearchAppBar from "../Components/AppBar";
import TitlebarBelowImageList from "../Components/Cardlists";
import { useNavigate } from 'react-router-dom'; // Import for navigation
function HomePage() {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate('/movies'); // Navigate to login page on button click
  };
  return (
    <div>
      <PrimarySearchAppBar />
      <Grid
        container
        style={{
          backgroundImage: `url(${Img})`,
          backgroundSize: "cover",
          width: "100%",
          height: "900px",
        }}
      >
        {" "}
        {/* Adjust height as needed */}
        
      </Grid>
      <Grid>
        <Typography>Movies</Typography>
        <Button sx={{marginLeft:"89vw"}} onClick={handleClick}>See More</Button>
        <TitlebarBelowImageList />
      </Grid>
      <Grid>
        <Typography>Cinemas</Typography>
        <Button sx={{marginLeft:"89vw"}}>See More</Button>

        <TitlebarBelowImageList />
      </Grid>
    </div>
  );
}
export default HomePage;
