import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import Img from './../images/Movie.jpeg';
import Grid from '@mui/system/Unstable_Grid/Grid';
export default function MediaCard({ data }) {
  const navigate = useNavigate();
  

  const handleClick = () => {
    
    // navigate('/movieDescription/${movieId}'); // Pass movieId as a parameter
    navigate(`/movieDescription/${data.movieId}`); // Pass movieId as a parameter

  };

  const handleBookClick = () => {
    navigate('/movieCinema/'); // Pass movieId as a parameter
  };

  return (
    <Card sx={{ width: '230px',height:'350px', backgroundColor: '#15011c' ,borderRadius:'10px' }}>
      <CardMedia
        sx={{ height: '200px' ,border: '3px solid #fff',borderRadius:'10px' }}
        image={Img}
        title={data.title}
      />
      <CardContent sx={{height:'50px'}}>
        <Typography gutterBottom variant="h7" component="div" color={'white'}>
          {data.title}
        </Typography>
        <Typography variant="body2" color="grey">
          {data.genre}
        </Typography>
      </CardContent>
      <CardActions sx={{marginLeft:'8px'}} >
    
          <Button sx={{marginRight:'40px'}} variant='contained'size="small" onClick={ handleBookClick}>Book</Button>
          <Button size="small" onClick={handleClick}>View More</Button>
    
        
      </CardActions>
    </Card>
  );
}
