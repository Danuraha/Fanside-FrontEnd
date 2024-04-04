import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import BookedDetails from './../Components/BookedDetails' // Import booked details component
import PaymentForm from './../Components/PaymentForm'; // Import payment form component

function PaymentGateway() {
  const mockBookedItems = [ // Mock data for BookedDetails (replace with actual data)
    { id: 1, name: 'Product 1', quantity: 2, price: 10 },
    { id: 2, name: 'Service 2', quantity: 1, price: 20 },
  ];

  return (
    <Container maxWidth="lg"> {/* Adjust container width as needed */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Secure Payment Gateway (Frontend Demo)
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <BookedDetails bookedItems={mockBookedItems} /> {/* Pass mock data */}
        </Grid>
        <Grid item xs={6}>
          <PaymentForm bookedItems={mockBookedItems} /> {/* Pass mock data */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default PaymentGateway;
