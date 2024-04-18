// import React from "react";
// import CinemaCard from "../Components/CinemaCard";
// import { Grid, Typography } from "@mui/material";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import SearchBar from "../Components/SearchBar";
// import PrimarySearchAppBar from "../Components/AppBar";
// function CinemaPage() {
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchtext, setSearchText] = useState("");
//   useEffect(() => {
//     fetchCinemas(); // Fetch data when the component mounts
//   }, []);

//   const fetchCinemas = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8081/api/v1/cinema/getCinema"
//       ); 
//       setItems(response.data); 
//     } catch (error) {
//       console.error("Error fetching cinemas:", error);
//     }
//   };
//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value.toLowerCase()); // Lowercase the search text for case-insensitive search
//   };
//   useEffect(() => {
//     if (searchtext) {
//       const filteredData = items.filter((item) =>
//         item.name.toLowerCase().includes(searchtext)
//       );

//       setFilteredItems(filteredData);
//     } else {
//       setFilteredItems(items); // Reset filtered items to all items if search text is empty
//     }
//   }, [searchtext, items]); // Update filteredItems whenever searchText or items change
//   return (
//     <Grid>
//       <PrimarySearchAppBar/>
//   <Grid sx={{width: "100%", height: "100%" }}>
      
//       <Typography fontSize={"30px"} fontWeight={'bold'} sx={{marginLeft:'40px',padding:'10px'}}>Cinemas</Typography>
//       <SearchBar handleSearchChange={handleSearchChange} />
//       <Grid
//         container
//         display={"flex"}
//         flexDirection={"row"}
//         justifyContent={"flex-start"}
//         alignItems={"center"}
//         gap={2}
//         rowGap={7}
//         padding={"50px"}
//       >
//         {filteredItems.map((item, index) => {
//           return <CinemaCard data={item} key={index} />;
//         })}
//       </Grid>
//     </Grid>
//     </Grid>
  
//   );
// }
// export default CinemaPage;

import React, { useState, useEffect } from "react";
import PrimarySearchAppBar from "../Components/AppBar";
import { Grid, Typography } from "@mui/material";
import CinemaCard from "../Components/CinemaCard";
import axios from "axios";
import SearchBar from "../Components/SearchBar";

function CinemaPage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchtext, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchCinemas(); // Fetch data when the component mounts
  }, []);

  const fetchCinemas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1/cinema/getCinema"
      );
      setItems(response.data);
      setFilteredItems(response.data); // Initialize filtered items with all items
    } catch (error) {
      console.error("Error fetching cinemas:", error);
    }
  };

  const handleSearchChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText); // Lowercase the search text for case-insensitive search

    // Filter items based on search text
    const filteredData = items.filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
    setFilteredItems(filteredData); // Update filtered items
    setCurrentPage(1); // Reset current page to 1 when search text changes
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Grid>
      <PrimarySearchAppBar />
      <Grid sx={{ width: "100%", height: "100%" }}>
        <Typography
          fontSize={"30px"}
          fontWeight={"bold"}
          sx={{ marginLeft: "40px", padding: "10px" }}
        >
          Cinemas
        </Typography>
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
          {currentItems.map((item, index) => {
            return <CinemaCard data={item} key={index} />;
          })}
        </Grid>
        {/* Pagination */}
        <div>
          {filteredItems.length > itemsPerPage && (
            <nav>
              <ul className="pagination">
                {Array.from(
                  { length: Math.ceil(filteredItems.length / itemsPerPage) },
                  (_, i) => i + 1
                ).map((number) => (
                  <li key={number} className="page-item">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        paginate(number);
                      }}
                      href="#"
                      className={`page-link ${
                        currentPage === number ? "active" : ""
                      }`}
                    >
                      {number}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

export default CinemaPage;
