import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Img from './../images/Avatar.jpeg'
export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 ,backgroundColor:'#ed6683'}}>
      <CardMedia
        sx={{ height: 140 }}
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
        <Button size="small">Book</Button>
        <Button size="small">View More</Button>
      </CardActions>
    </Card>
  );
}