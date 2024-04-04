import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

function BookedDetails({ bookedItems }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Booked Details
      </Typography>
      <List>
        {bookedItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={
                <>
                  Quantity: {item.quantity} - Price: {item.price}
                </>
              }
            />
          </ListItem>
        ))}
        <ListItem>
          <ListItemText
            primary="Total"
            secondary={`$${calculateTotal(bookedItems)}`} // Implement function to calculate total
          />
        </ListItem>
      </List>
    </div>
  );
}

export default BookedDetails;

function calculateTotal(items) { // Function to calculate total
  // Implement logic to calculate total price based on items array
  // (e.g., reduce function or loop)
  return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
}
