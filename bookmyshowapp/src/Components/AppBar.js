import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import axios from "axios";
// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
// const navigate = useNavigate();

export default function PrimarySearchAppBar() {

  const handleSignUpClick = () => {
    navigate("/signup");
  };
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to login page on button click
  };
  const profileClick = () => {
    navigate("/profile"); // Navigate to login page on button click
  };
  const handleClick = () => {
    navigate("/movies"); // Navigate to login page on button click
  };

  const handleCinemaClick = () => {
    navigate("/CinemaPage"); // Navigate to login page on button click
  };

  const handleHomeClick = () => {
    navigate("/"); // Navigate to login page on button click
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const navigate = useNavigate();


  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleHistory = () => {
    navigate("/history"); // Navigate to login page on button click
  };
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      // const response = await fetch('http://localhost:8081/api/v1/auth/logout', { // Replace with your logout URL
        // method: 'POST', // Consider using POST for CSRF protection
        // credentials: 'include' // Include cookies for session management (if applicable)
      // }
      // );

      const response = await axios.post('http://localhost:8081/api/v1/auth/logout',
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },} );


      if (response.ok) {
        navigate('/login'); // Redirect to login page after successful logout
      } else {
        console.error('Logout failed:', response.statusText);
        // Handle logout failure (e.g., display an error message)
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Handle logout error (e.g., display an error message)
    }
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={profileClick}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      <MenuItem onClick={handleHistory}>History</MenuItem>

    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "brown", height: "7vw" }}>
          
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 0,mt: -1}}
            onClick={handleHomeClick}
          >
            <CottageRoundedIcon />
          </IconButton>
          <Button
            variant="h3"
            onClick={handleClick}
            sx={{ display: { xs: "none", sm: "block" ,fontSize:'20px'},fontWeight:'bold' }}
          >
            MOVIES
          </Button>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{  height: "2vw", margin: "1vw" ,marginTop:'2.3vw',width:'3px',backgroundColor:'yellow'}}
          />
          <Button
            variant="h3"
            onClick={handleCinemaClick}
            sx={{ display: { xs: "none", sm: "block",fontSize:'20px' } ,fontWeight:'bold'}}
          >
            CINEMAS
          </Button>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleLoginClick}
              sx={{ backgroundColor: "orange", margin: "5px", color: "white" }}
            >
              LogIn
            </Button>
            <Button
              onClick={handleSignUpClick}
              sx={{ backgroundColor: "yellow", margin: "5px" }}
            >
              {" "}
              SignUp
            </Button>
            {/* <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
