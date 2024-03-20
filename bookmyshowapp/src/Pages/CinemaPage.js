import React from "react"
import CinemaCard from "../Components/CinemaCard";
import { Grid ,Typography} from "@mui/material";
function CinemaPage(){
    return(
        <Grid sx={{backgroundColor:'#f5e6f0'}}>
      <Typography fontSize={"30px"}>Cinema</Typography>
      <Grid sx={{margin:'100px'}}> 
      <Grid container direction={'row'} justifyContent={'space-between'}> 
        <CinemaCard />
        <CinemaCard />
        <CinemaCard />
        <CinemaCard />
      </Grid>
      <Grid container direction={'row'} justifyContent={'space-between'} marginTop={'50px'}> 
        <CinemaCard />
        <CinemaCard />
        <CinemaCard />
        <CinemaCard />
      </Grid>
      <Grid container direction={'row'} justifyContent={'space-between'}marginTop={'50px'}> 
        <CinemaCard />
        <CinemaCard />
        <CinemaCard />
        <CinemaCard />
      </Grid>
      </Grid>
      
    </Grid>
    )
}
export default CinemaPage;