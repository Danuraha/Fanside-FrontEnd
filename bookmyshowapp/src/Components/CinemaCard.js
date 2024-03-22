import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Img from './../images/Movie.jpeg'
import { useNavigate } from'react-router-dom'; // Import for navigation
export default function CinemaCard() {
//   const navigate = useNavigate();
//   const handleClick=() => {
//     navigate('/movieDescription');
//   }
  return (
    <Card sx={{ maxWidth: '20vw' ,backgroundColor:'#e6953e'}}>
      <CardMedia
        sx={{ height: '10vw' }}
        image={Img}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Cinema
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <Grid display={'flex'} sx={{justifyContent:'center'}}> 
      <CardActions>
        {/* <Button size="small">Book</Button> */}
        <Button size="small"  >View More</Button>
      </CardActions>
      </Grid>
     
    </Card>
  );
}