import React from "react";
import CinemaRecipeReviewCard from "../Components/CinemaDes";
import { Grid, Typography } from "@mui/material";
import PrimarySearchAppBar from "../Components/AppBar";
function CinemaDescriptionPage() {
  return (
   
      <Grid>
        <PrimarySearchAppBar/>
        <CinemaRecipeReviewCard/>
       </Grid>
  );
}
export default CinemaDescriptionPage;
