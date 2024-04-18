// import React, { useEffect, useState } from "react";

// import PrimarySearchAppBar from "../Components/AppBar";
// import { Grid, Typography } from "@mui/material";
// import MediaCard from "../Components/Card";
// import Img from "./../images/Movie.jpeg";
// import axios from "axios";
// import SearchBar from "../Components/SearchBar";

// function MoviePage() {
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchtext, setSearchText] = useState("");
//   useEffect(() => {
//     fetchMovies(); // Fetch data when the component mounts
//   }, []);

//   const fetchMovies = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8081/api/v1/movie/getMovie"
//       ); // Adjust the endpoint URL according to your backend API
//       setItems(response.data); // Update state with the fetched data
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };
 
//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value.toLowerCase()); // Lowercase the search text for case-insensitive search
//   };

//   useEffect(() => {
//     if (searchtext) {
//       const filteredData = items.filter((item) =>
//         item.title.toLowerCase().includes(searchtext)
//       );
//       setFilteredItems(filteredData);
//     } else {
//       setFilteredItems(items); // Reset filtered items to all items if search text is empty
//     }
//   }, [searchtext, items]); // Update filteredItems whenever searchText or items change
//   return (
//     <Grid>
// <PrimarySearchAppBar/>
//     <Grid sx={{  width: "100%", height: "100%" }}>
//       <Typography fontSize={"30px"} fontWeight={'bold'} sx={{marginLeft:'40px',padding:'10px'}}>Movies</Typography>
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
//           return <MediaCard data={item} key={index} />;
//         })}
//       </Grid>
//     </Grid>
//     </Grid>
    
//   );
// }
// export default MoviePage;

import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../Components/AppBar";
import { Grid, Typography } from "@mui/material";
import MediaCard from "../Components/Card";
import Img from "./../images/Movie.jpeg";
import axios from "axios";
import SearchBar from "../Components/SearchBar";

function MoviePage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchtext, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchMovies(); // Fetch data when the component mounts
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1/movie/getMovie"
      ); // Adjust the endpoint URL according to your backend API
      setItems(response.data); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value.toLowerCase()); // Lowercase the search text for case-insensitive search
  };

  useEffect(() => {
    if (searchtext) {
      const filteredData = items.filter((item) =>
        item.title.toLowerCase().includes(searchtext)
      );
      setFilteredItems(filteredData);
    } else {
      setFilteredItems(items); // Reset filtered items to all items if search text is empty
    }
  }, [searchtext, items]); // Update filteredItems whenever searchText or items change

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

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
          Movies
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
            return <MediaCard data={item} key={index} />;
          })}
        </Grid>
        {/* Pagination */}
        <div>
          {filteredItems.length > itemsPerPage && (
            <nav>
              <ul className="pagination">
                {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, i) => i + 1).map((number) => (
                  <li key={number} className="page-item">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        paginate(number);
                      }}
                      href="#"
                      className={`page-link ${currentPage === number ? "active" : ""}`}
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
export default MoviePage;

