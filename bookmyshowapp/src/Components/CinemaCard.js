import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Img from './../images/Cinema.jpeg'
import { useNavigate } from'react-router-dom'; // Import for navigation
export default function CinemaCard({data}) {
  const navigate = useNavigate();
  const handleClick=() => {
    navigate('/cinemaMovie');
  }
  const handleBookClick=() => {
    navigate(`/cinemaDescription/${data.cinemaId}`);
  }
  return (
    <Card sx={{ width: '230px',height:'350px', backgroundColor: '#8c0446' ,borderRadius:'10px' }}>
      <CardMedia
        sx={{ height: '200px' ,border: '3px solid #fff',borderRadius:'10px' }}
        image={Img}
        title="green iguana"
      />
      <CardContent sx={{height:'50px'}}>
      <Typography gutterBottom variant="h7" component="div" color={'white'}>
          {data.name}
        </Typography>
        <Typography variant="body2" color="grey">
          {data.location}
        
        </Typography>
      </CardContent>
      <Grid display={'flex'} sx={{justifyContent:'center'}}> 
      <CardActions sx={{marginLeft:'8px'}} >
    
    <Button sx={{marginRight:'40px'}} variant='contained'size="small" onClick={ handleClick}>Book</Button>
    <Button size="small" onClick={handleBookClick}>View More</Button>

  
</CardActions>
      </Grid>
     
    </Card>
  );
}