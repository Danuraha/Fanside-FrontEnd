import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import AlertDialogSlide from "../Components/SeatCount";
import PrimarySearchAppBar from "../Components/AppBar";

function CinemaMovie() {
  const [movies, setMovies] = useState([]); 
  const { cinemaId } = useParams();

  useEffect(() => {
    fetchMovies(); 
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/v1/showtime/getbycinemaId/${cinemaId}`
      ); 

      const filteredShows = response.data.filter((show) => {
        const showDate = new Date(show.showdate);

        if (isNaN(showDate.getTime())) {
          console.error(`Invalid date format for show: ${show.showdate}`);
          return false; // Exclude invalid dates
        }

        return showDate >= new Date();
      });
      console.log(filteredShows); // Log the response data for debugging
      setMovies(filteredShows); // Update state with fetched movies
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  const uniqueMovieIds=[
    ...new Set(movies.map((movie) => movie.movie.movieId)),
  ];

  const groupedByMovieId = {};

  uniqueMovieIds.forEach((movieId) => {
    const filteredMovies = movies.filter(
      (movie) => movie.movie.movieId === movieId
    );

    groupedByMovieId[movieId] = filteredMovies;
  });

  console.log(groupedByMovieId);

  console.log(groupedByMovieId[2]);

  return (
    <Grid>
      <PrimarySearchAppBar/>
      <div>
      <h1>Movies at Cinema {cinemaId}</h1>
      {movies.length > 0 ? (

      // {uniqueMovieIds !== null ? (
        uniqueMovieIds.map((movieId, index) => (
          <div key={index}>
            <Grid >
              {" "}
              <h2>{groupedByMovieId[movieId][0].movie.title}</h2>
            </Grid>
            {groupedByMovieId[movieId].map((show) => (
              <Grid container display={"flex"} flexDirection={"row"}>
                <Grid item xs={3} sx={{ marginTop: "25px" }}>
                  <Typography variant="outlined" sx={{ margin: "20px" }}>
                    {" "}
                    {show.startTime} - {show.endTime}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  {" "}
                  <Typography sx={{ marginTop: "25px" }}>
                    Price: Rs. {show.price}
                  </Typography>
                </Grid>
                <Grid item xs={3} sx={{ marginTop: "25px" }}>
                  {" "}
                  <Typography>{show.showdate}</Typography>
                </Grid>
                <Grid item xs={3} sx={{ marginTop: "10px" }}>
                  {" "}
                  <AlertDialogSlide data={show} key={index}/>
                </Grid>
              </Grid>
            ))}

            <Divider sx={{marginTop:'50px'}} />
          </div>
        ))
      ) : (
        <p>No Cinemas found for this Movie or error fetching data.</p>
      )}
    </div>
    </Grid>
 
  );
}

export default CinemaMovie;
