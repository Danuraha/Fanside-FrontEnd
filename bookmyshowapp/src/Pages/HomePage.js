import { AppBar, Typography ,Grid, Button} from "@mui/material";
import React from "react";
import Img from './../images/Theatre.jpeg';
import PrimarySearchAppBar from "../Components/AppBar";
import TitlebarBelowImageList from "../Components/Cardlists";
function HomePage(){
    return(
        <div>
        <PrimarySearchAppBar/>
        <Grid container style={{ backgroundImage: `url(${Img})`, backgroundSize: 'cover', width: '100%', height: '1200px' }}> {/* Adjust height as needed */}
     <Typography display={'flex'} sx={{color:'white',fontSize:'80px',justifyContent:'center',alignItems:'center',marginLeft:'30vw'}}> Welcome to Book My Show</Typography>
    </Grid>
        <Grid>
        <Typography>
            Movies
        </Typography>
        <TitlebarBelowImageList/>
        </Grid>
        <Grid>
        <Typography>
            Cinemas
        </Typography>
        <TitlebarBelowImageList/>
        </Grid>
        
       
        </div>
    );
}
export default HomePage;