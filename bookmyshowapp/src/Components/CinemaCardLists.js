import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function CinemaCardList() {
  const navigate = useNavigate();
  const handleClick = () => {
    // navigate("/movieDescription");
  };
  return (
    <ImageList
      sx={{ width: "90vw", display: "flex", flexWrap: "nowrap", margin: "3vw" }}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <Button onClick={handleClick}>
            {" "}
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              style={{ width: "250px" }}
            />
          </Button>

          <ImageListItemBar
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
    
      {
        img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        title: "Tomato basil",
        author: "@shelleypauls",
      },
      {
        img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
        title: "Sea star",
        author: "@peterlaster",
      },
      {
        img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        title: "Bike",
        author: "@southside_customs",
      },
    // {
    //     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    //     title: "Breakfast",
    //     author: "@bkristastucchio",
    //   },
    //   {
    //     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    //     title: "Burger",
    //     author: "@rollelflex_graphy726",
    //   },
      {
        img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        title: "Honey",
        author: "@arwinneil",
      },
      
      
      {
        img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        title: "Bike",
        author: "@southside_customs",
      },
      {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        title: "Camera",
        author: "@helloimnik",
      },
 
    {
        img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
        title: "Coffee",
        author: "@nolanissac",
      },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
  },
 
  
 
  
];
