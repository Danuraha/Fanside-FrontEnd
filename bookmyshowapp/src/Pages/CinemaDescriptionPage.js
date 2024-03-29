import React from "react";
import CinemaRecipeReviewCard from "../Components/CinemaDes";
import { Grid, Typography } from "@mui/material";
function CinemaDescriptionPage() {
  return (
    <Grid sx={{backgroundColor: "#f5e6f0" ,height:'1300px'}}>
      <Typography textAlign={"center"}>Cinema Name</Typography>
      <Grid display="flex" sx={{ justifyContent: "center", marginTop: "20px" }}>
        <CinemaRecipeReviewCard/>
      </Grid>
    </Grid>
  );
}
export default CinemaDescriptionPage;
