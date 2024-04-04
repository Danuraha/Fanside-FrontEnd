import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

import { useEffect } from 'react';
import PrimarySearchAppBar from '../Components/AppBar';
const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/v1/user/1'); // Replace with your actual API endpoint
      setUserData(response.data);
      setEditedUserData(response.data); // Initialize editedUserData with fetched data
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleChange = (event) => {
    setEditedUserData({
      ...editedUserData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('http://localhost:8081/api/v1/user/save', 
      {editedUserData}
      );
      console.log('Response from PUT request:', response.data);
      setUserData(response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving edited data:', error);
      // Display an error message to the user or handle the error appropriately
    }
  };
  

  return (
    <Grid>
      <PrimarySearchAppBar/>
      <Card sx={{ maxWidth: 600, margin: 'auto', padding: 3 ,marginTop:'80px',marginBottom:'40px',backgroundColor:'#f2c9dd'}}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Avatar sx={{ width: 100, height: 100, mx: 'auto' }}>
              {/* Display user's avatar or initials here */}
              {userData.firstName ? userData.firstName[0].toUpperCase() : ''}
            </Avatar>
          </Grid>
          <Grid item xs={12} sm={6}>
            {editMode ? (
              <>
             
                <TextField
                  label="First Name"
                  name="firstName"
                  value={editedUserData.firstName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={editedUserData.lastName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={editedUserData.phoneNumber}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Address"
                  name="address"
                  value={editedUserData.address}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Gender"
                  name="gender"
                  value={editedUserData.gender}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </>
            ) : (
              <>
                <Typography variant="h5" gutterBottom>
                  {userData.firstName} {userData.lastName}
                </Typography>
                <Typography variant="body1">
                  Phone Number: {userData.phoneNumber}
                </Typography>
                <Typography variant="body1">Address: {userData.address}</Typography>
                <Typography variant="body1">Gender: {userData.gender}</Typography>
              </>
            )}
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          sx={{marginTop:'20px',marginLeft:'50px'}}
          endIcon={<EditIcon />}
          // onClick={handleEditClick}
          // onClick={handleSave}
          // disabled={editMode}
          onClick={editMode ? handleSave : handleEditClick}
        >
          {editMode ? 'Save' : 'Edit Profile'}
          {/* {editMode ? onClick={handleSave}: onClick={handleEditClick}} */}
        </Button>
        {editMode && (
          <Button variant="outlined" onClick={handleEditClick} sx={{marginTop:'20px',marginLeft:'20px'}}>
            Cancel
          </Button>
        )}
      </CardContent>
    </Card>
    </Grid>
 
  );
};

export default UserProfile;
