import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Img from './../images/Movie.jpeg'
import { useNavigate } from'react-router-dom'; // Import for navigation
export default function MediaCard() {
  const navigate = useNavigate();
  const handleClick=() => {
    navigate('/movieDescription');
  }
  const handlebookclick=() => {
    navigate('/ticketBooking');
  }
  return (
    <Card sx={{ maxWidth: '20vw' ,backgroundColor:'#ed6683'}}>
      <CardMedia
        sx={{ height: '10vw' }}
        image={Img}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Movie
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handlebookclick}>Book</Button>
        <Button size="small" onClick={handleClick}>View More</Button>
      </CardActions>
    </Card>
  );
}