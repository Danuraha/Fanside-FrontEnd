import React from "react";

import PrimarySearchAppBar from "../Components/AppBar";
import { Grid, Typography } from "@mui/material";
import MediaCard from "../Components/Card";

function MoviePage() {
  
  return (
    <Grid sx={{backgroundColor:'#f5e6f0'}}>
      <Typography fontSize={"30px"}>Movies</Typography>
      <Grid sx={{margin:'100px'}}> 
      <Grid container direction={'row'} justifyContent={'space-between'}> 
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
      </Grid>
      <Grid container direction={'row'} justifyContent={'space-between'} marginTop={'50px'}> 
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
      </Grid>
      <Grid container direction={'row'} justifyContent={'space-between'}marginTop={'50px'}> 
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
      </Grid>
      </Grid>
      
    </Grid>
  );
}
export default MoviePage;
