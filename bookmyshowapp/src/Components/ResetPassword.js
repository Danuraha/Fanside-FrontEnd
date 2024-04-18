import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
const ResetPasswordCard = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');

  const handleResetPassword =async () => {
    try {
        const token = localStorage.getItem('authToken');
      console.log(token);
        
      const response = await axios.post(
        'http://localhost:8081/api/v1/user/changepassword',
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmationPassword: confirmationPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      
        console.log('Response from POST request:', response.data);
       
      } catch (error) {
        console.error('Error saving edited data:', error);
        // Display an error message to the user or handle the error appropriately
      }
    // Handle reset password logic here
    console.log(currentPassword);
    console.log(newPassword);
    console.log(confirmationPassword);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', padding: 3 ,marginTop:'80px',marginBottom:'40px',backgroundColor:'#f2c9dd'}}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Reset Password
        </Typography>
        <TextField
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirmation Password"
          type="password"
          value={confirmationPassword}
          onChange={(e) => setConfirmationPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleResetPassword}
          disabled={!currentPassword || !newPassword || !confirmationPassword || newPassword !== confirmationPassword}
        >
          Reset Password
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordCard;
