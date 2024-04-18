import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import AlertDialogSlide from "../Components/SeatCount";
import Button from "@mui/material/Button";
import PrimarySearchAppBar from "../Components/AppBar";
function MovieCinemaPage() {
  const [cinemas, setCinemas] = useState([]); 
  const { movieId } = useParams();
  useEffect(() => {
    fetchMovies(); 
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/v1/showtime/getbymovieId/${movieId}`
      ); 

       const filteredShows = response.data.filter((show) => {
        const showDate = new Date(show.showdate);

        if (isNaN(showDate.getTime())) {
          console.error(`Invalid date format for show: ${show.showdate}`);
          return false;
        }

        return showDate >= new Date();
      });
      setCinemas(filteredShows); 
    } catch (error) {
      console.error("Error fetching cinemas:", error);
    }
  };


  const uniqueCinemaIds = [
    ...new Set(cinemas.map((cinema) => cinema.cinema.cinemaId)),
  ];

  const groupedByCinemaId = {};

  uniqueCinemaIds.forEach((cinemaId) => {
    const filteredCinemas = cinemas.filter(
      (cinema) => cinema.cinema.cinemaId === cinemaId
    );

    groupedByCinemaId[cinemaId] = filteredCinemas;
  });

  console.log(groupedByCinemaId);

  console.log(groupedByCinemaId[2]);
  // console.log(X)

  return (
    <Grid>
      <PrimarySearchAppBar/>
      <div>
      <h1>Cinemas at Movies {movieId}</h1>
      {cinemas.length > 0 ? (
      // {uniqueCinemaIds !== null ? (
        uniqueCinemaIds.map((cinemaId, index) => (
          <div key={index}>
            <Grid >
              {" "}
              <h2>{groupedByCinemaId[cinemaId][0].cinema.name}</h2>
            </Grid>
            {groupedByCinemaId[cinemaId].map((show) => (
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
                  <Typography>
                    {/* {show.showdate} */}
                    {show.showdate}
                  </Typography>
                </Grid>
                <Grid item xs={3} sx={{ marginTop: "10px" }}>
                  {" "}
                  <AlertDialogSlide data={show} key={index} />
                  
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
export default MovieCinemaPage;
