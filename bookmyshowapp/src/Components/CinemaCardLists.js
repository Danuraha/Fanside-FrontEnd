import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CinemaImg from "../images/Cinema.jpeg";
import Grid from "@mui/material/Grid";
export default function CinemaCardList() {
  const navigate = useNavigate();
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    fetchCinemas(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const fetchCinemas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1/cinema/getCinema"
      ); // Adjust the endpoint URL according to your backend API
      setCinemas(response.data); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching cinemas:", error);
    }
  };

  const handleClick = (cinemaId) => {
    navigate(`/cinemaDescription/${cinemaId}`);
  };

  return (
    <ImageList
      sx={{ width: "90vw",
      height: "45vh", display: "flex", flexWrap: "nowrap", margin: "3vw" }}
    >
      {cinemas.map((cinema) => (
        <ImageListItem key={cinema.cinemaId}>
          <Grid
            sx={{
              padding: "5px",
              marginRight: "10px",
              backgroundColor: "#8c0446",
              // borderRadius: "5px",
            }}
          >
            <Button
              onClick={() => {
                handleClick(cinema.cinemaId);
              }}
            >
              {" "}
              <img
                src={CinemaImg}
                alt={cinema.name}
                loading="lazy"
                style={{ width: "250px", 
                border: "2px solid #fff" }}
                />
            </Button>

            <ImageListItemBar
              title={cinema.name}
              subtitle={<span>Location: {cinema.location}</span>}
              position="below"
              sx={{ border: "1px solid #fff",textAlign: "center",color: "white",fontWeight:'bold',backgroundColor: "#8c0446",borderRadius:'5px',margin:'5px'}}

            />
          </Grid>
        </ImageListItem>
      ))}
    </ImageList>
  );
}
