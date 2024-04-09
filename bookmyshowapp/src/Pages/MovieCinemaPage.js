import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import AlertDialogSlide from "../Components/SeatCount";
import Button from "@mui/material/Button";
import PrimarySearchAppBar from "../Components/AppBar";
function MovieCinemaPage() {
  const [cinemas, setCinemas] = useState([]); // State to store fetched movies
  const { movieId } = useParams();
  // const [X,setX] = useState([]);
  useEffect(() => {
    fetchMovies(); // Fetch data when the component mounts
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/v1/showtime/getbymovieId/${movieId}`
      ); // Adjust the endpoint URL according to your backend API
      // console.log(response.data); // Log the response data for debugging

       // Filter for shows on or after the current date (adjusted for potential parsing issues)
       const filteredShows = response.data.filter((show) => {
        const showDate = new Date(show.showdate);

        // Handle potential parsing issues
        if (isNaN(showDate.getTime())) {
          console.error(`Invalid date format for show: ${show.showdate}`);
          return false; // Exclude invalid dates
        }

        return showDate >= new Date();
      });
      setCinemas(filteredShows); // Update state with fetched movies
    } catch (error) {
      console.error("Error fetching cinemas:", error);
    }
  };

  // const X = cinemas.filter(cinema =>cinema.cinema.cinemaId===2)

  // Assuming `cinemas` is your array of cinema objects

  // Extract unique cinema IDs
  const uniqueCinemaIds = [
    ...new Set(cinemas.map((cinema) => cinema.cinema.cinemaId)),
  ];

  // Group cinemas by cinemaId
  const groupedByCinemaId = {};

  // Iterate over each unique cinema ID
  uniqueCinemaIds.forEach((cinemaId) => {
    // Filter cinemas by the current cinema ID
    const filteredCinemas = cinemas.filter(
      (cinema) => cinema.cinema.cinemaId === cinemaId
    );

    // Add filtered cinemas to groupedByCinemaId
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

            <Divider />
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
