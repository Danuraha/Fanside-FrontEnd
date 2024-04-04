import React, { useState } from 'react';
import { Box, Typography,Grid, Button } from '@mui/material';

// Define a mock data structure for the theatre layout
const theatreLayout = {
  rows: 5, // Adjust number of rows
  seatsPerRow: 10, // Adjust number of seats per row
};

const Seat = ({ seatNumber, isAvailable, onSelect }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (isAvailable) {
      onSelect(!isSelected);
      setIsSelected(!isSelected);
    }
  };

  const seatStyle = {
    backgroundColor: isSelected ? 'lightblue' : isAvailable ? 'white' : 'gray',
    padding: '10px',
    width: '12px',
    // height: '100px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px',
    border:'1px solid #cbd1cc',
    cursor: 'pointer',
  };

  return (
    
        <Box sx={seatStyle} onClick={handleClick}>
          <Typography variant="body2">{seatNumber}</Typography>
        </Box>
  
    
  );
};

const SeatRow = ({ rowNumber, seats, onSelectSeat }) => (
    <div key={rowNumber} style={{ display: 'flex' }}>
      {seats.map((seat) => (
        <Seat
          key={seat.seatNumber} // Use seat.seatNumber for the key
          seatNumber={seat.seatNumber}
          isAvailable={seat.isAvailable}
          onSelect={(isSelected) => onSelectSeat(rowNumber, seat.seatNumber, isSelected)}
        />
      ))}
    </div>
  );
  
const TicketBookingPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelectSeat = (row, seatNumber, isSelected) => {
    const newSelectedSeats = [...selectedSeats];
    const seatIndex = newSelectedSeats.findIndex(
      (seat) => seat.row === row && seat.seatNumber === seatNumber
    );

    if (isSelected && seatIndex === -1) {
      newSelectedSeats.push({ row, seatNumber });
    } else if (!isSelected && seatIndex !== -1) {
      newSelectedSeats.splice(seatIndex, 1);
    }

    setSelectedSeats(newSelectedSeats);
    
  };

  const rows = Array(theatreLayout.rows).fill(0).map((_, rowIndex) => ({
    rowNumber: rowIndex + 1,
    seats: Array(theatreLayout.seatsPerRow).fill(0).map((_, seatIndex) => ({
      seatNumber: seatIndex + 1,
      isAvailable: true, // Adjust availability logic here (e.g., randomize)
    })),
  }));



  return (
    <div>
        <Grid sx={{marginLeft:'400px',padding:'100px'}}>
      <h2>Theatre Seat Selection</h2>
      {rows.map((rowNumber) => (
        <SeatRow
          key={rowNumber}
          rowNumber={rowNumber}
          seats={rowNumber.seats}
          onSelectSeat={handleSelectSeat}
        />
      ))}
      <p>Selected Seats: {selectedSeats.length > 0 ? selectedSeats.map((seat) => `${seat.row.rowNumber}${seat.seatNumber}` ) .join(', '): 'None'}</p>
     {/* `${seat.row}-${seat.seatNumber}, `).join('').slice(0, -2) */}
    <Button variant='contained'>Proceed</Button>
    </Grid>
    </div>
  );
};

export default TicketBookingPage;
