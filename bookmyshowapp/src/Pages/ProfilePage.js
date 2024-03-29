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
const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get('http://your-backend-api-endpoint'); // Replace with your actual API endpoint
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
      const response = await axios.put('http://', editedUserData); // Replace with your actual PUT endpoint
      console.log('Saved edited data:', response.data);
      setUserData(response.data); // Update local state with saved data
      setEditMode(false);
    } catch (error) {
      console.error('Error saving edited data:', error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };

  return (
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
                  label="Sex"
                  name="sex"
                  value={editedUserData.sex}
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
                <Typography variant="body1">Sex: {userData.sex}</Typography>
              </>
            )}
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          sx={{marginTop:'20px',marginLeft:'50px'}}
          endIcon={<EditIcon />}
          onClick={handleEditClick}
          disabled={editMode}
        >
          {editMode ? 'Save' : 'Edit Profile'}
        </Button>
        {editMode && (
          <Button variant="outlined" onClick={handleSave} sx={{marginTop:'20px',marginLeft:'20px'}}>
            Cancel
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfile;
