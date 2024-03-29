import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieImg from "../images/Movie.jpeg";
import axios from "axios";
export default function TitlebarBelowImageList() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const handleClick = (movieId) => {
    console.log("Button clicked with movieId:", movieId);
    navigate(`/movieDescription/${movieId}`);
  };

  useEffect(() => {
    fetchMovies(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1/movie/getMovie"
      ); // Adjust the endpoint URL according to your backend API
      setMovies(response.data); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  return (
    <ImageList
      sx={{
        width: "90vw",
        height: "45vh",
        display: "flex",
        flexWrap: "nowrap",
        margin: "3vw",
        
      }}
    >
      {movies.map((movie) => (
        <ImageListItem key={movie.movieId}>
          <Grid sx={{padding:'5px',marginRight:'10px',backgroundColor: "#381031",
          // borderRadius:'5px'
          }}>
          <Button onClick={() => handleClick(movie.movieId)}>
            {" "}
            <img
              src={MovieImg}
              alt={movie.title}
              loading="lazy"
              style={{ width: "250px", border: "4px solid #fff" }}
            />
          </Button>

          <ImageListItemBar
            title={movie.title}
            subtitle={<span> {movie.genre}</span>}
            position="below"
            sx={{ border: "1px solid #fff",textAlign: "center",color: "white",backgroundColor: "#381031 ",borderRadius:'5px',margin:'5px',fontWeight: "bold"}}
          />
          </Grid>
          
        </ImageListItem>
      ))}
    </ImageList>
  );
}
