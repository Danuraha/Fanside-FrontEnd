import React from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar"
import profile from '../images/Avatar.jpeg';
function UserProfilePage() {
    
  return (
    <Grid
      container
      flexDirection={"column"}
      display={"flex"}
      sx={{ justifyContent: "center", alignItems: "center", padding: "60px"}}
    >
      <Grid sx={{ marginBottom: "15px" }}>
        <Typography fontSize={'30px'}>Name</Typography>
      </Grid>
      <Grid >
        {" "}
        <Avatar src={profile} sx={{width:'150px',height:'150px'}}/>
      </Grid>
      <Grid>
        <Typography>Address:</Typography>
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
          sx={{marginBottom:'30px',width:'20vw',backgroundColor:'#f2cee1'}}
        />
      </Grid>
      <Grid>
      <Typography>Phone NUmber:</Typography>
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
          sx={{marginBottom:'30px',width:'20vw',backgroundColor:'#f2cee1'}}
        />
      </Grid>
      <Grid>
      <Typography>Age:</Typography>
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
          sx={{marginBottom:'30px',width:'20vw',backgroundColor:'#f2cee1'}}
        />
      </Grid>
      <Grid>
      <Typography>Sex:</Typography>
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
          sx={{marginBottom:'30px',width:'20vw',backgroundColor:'#f2cee1'}}
        />
      </Grid>
      <Button variant="contained">Save</Button>
    </Grid>
  );
}

export default UserProfilePage;
