import React from "react";
import RecipeReviewCard from "../Components/MovieCard";
import { Grid, Typography } from "@mui/material";
function MovieDescriptionPage() {
  return (
    <Grid sx={{backgroundColor: "#f5e6f0" ,height:'1300px'}}>
      <Typography textAlign={"center"}>Movie Name</Typography>
      <Grid display="flex" sx={{ justifyContent: "center", marginTop: "20px" }}>
        <RecipeReviewCard />
      </Grid>
    </Grid>
  );
}
export default MovieDescriptionPage;
