import React from "react";
import CinemaCard from "../Components/CinemaCard";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
function CinemaPage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchtext, setSearchText] = useState("");
  useEffect(() => {
    fetchCinemas(); // Fetch data when the component mounts
  }, []);

  const fetchCinemas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1/cinema/getCinema"
      ); // Adjust the endpoint URL according to your backend API
      setItems(response.data); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching cinemas:", error);
    }
  };
  const handleSearchChange = (event) => {
    setSearchText(event.target.value.toLowerCase()); // Lowercase the search text for case-insensitive search
  };
  useEffect(() => {
    if (searchtext) {
      const filteredData = items.filter((item) =>
        item.name.toLowerCase().includes(searchtext)
      );

      setFilteredItems(filteredData);
    } else {
      setFilteredItems(items); // Reset filtered items to all items if search text is empty
    }
  }, [searchtext, items]); // Update filteredItems whenever searchText or items change
  return (
    <Grid sx={{ backgroundColor: "#f2d9fa", width: "100%", height: "100%" }}>
      <Typography fontSize={"30px"} fontWeight={'bold'} sx={{marginLeft:'40px',padding:'10px'}}>Cinemas</Typography>
      <SearchBar handleSearchChange={handleSearchChange} />
      <Grid
        container
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={2}
        rowGap={7}
        padding={"50px"}
      >
        {filteredItems.map((item, index) => {
          return <CinemaCard data={item} key={index} />;
        })}
      </Grid>
    </Grid>
  );
}
export default CinemaPage;
