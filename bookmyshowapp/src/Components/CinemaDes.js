import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Img from "./../images/Cinema.jpeg";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CinemaRecipeReviewCard() {
  const { cinemaId } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const response = await axios.get(
          `http://localhost:8081/api/v1/cinema/${cinemaId}` 
        );
        console.log(response.data[0]);
        setData(response.data[0]);
      } catch (error) {
        console.error("Error fetching cnemas:", error);
      }
    };

    fetchData();
  }, []);
  // const data = {
  //   title: 'Paella dish',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     genre: 'crime'
  // }
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cinemaMovie/${cinemaId}`); // Navigate to login page on button click
  };
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <Card >
      <CardHeader 
       
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.name}
      />
      <CardMedia component="img" height="400" image={Img} alt="Paella dish" />
      <CardContent >
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          sx={{ margin: "20px" }}
          onClick={handleClick}
        >
          Book Now
        </Button>
       
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
        <CardContent>
          <Typography paragraph>More:</Typography>
          <Typography paragraph>{data.location}</Typography>
          <Typography paragraph>{data.descriptiveDescription}</Typography>
        </CardContent>
      {/* </Collapse> */}
    </Card>
  );
}
