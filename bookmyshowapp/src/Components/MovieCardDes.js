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
import Img from "./../images/Movie.jpeg";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"; // Import for navigation
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

export default function RecipeReviewCard() {
  const {movieId}=useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true); // Set loading state to true
      try {
        const response = await axios.get(
          `http://localhost:8081/api/v1/movie/${movieId}` // Adjust URL as needed
        );
        console.log(response.data[0]);
        setData(response.data[0]);
      } catch (error) {
        // setError(error);
        console.error("Error fetching movies:", error);
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
    navigate("/movieCinema"); // Navigate to login page on button click
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    
    <Card sx={{ width: "1200px" }}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.title}
      />
      <CardMedia component="img" height="400" image={Img} alt="Paella dish" />
      <CardContent>
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
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>{data.genre}</Typography>
          <Typography paragraph>{data.description}</Typography>
          <Typography paragraph>{data.description}</Typography>
          <Typography>{data.genre}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
