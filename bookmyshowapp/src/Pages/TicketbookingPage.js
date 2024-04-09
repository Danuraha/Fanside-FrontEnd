import React, { useState } from "react";
import { Box, Typography, Grid, Button, Alert } from "@mui/material";
import axios from "axios"; // Import axios for making HTTP requests
import { jwtDecode } from "jwt-decode";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PaymentList from "../Components/paymentList";
import PaymentForm from "../Components/PaymentForm";
// import { useLocation } from 'react-router-dom';
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
    backgroundColor: isSelected ? "lightblue" : isAvailable ? "white" : "gray",
    padding: "10px",
    width: "12px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px",
    border: "1px solid #cbd1cc",
    // cursor: 'pointer',
    cursor: isAvailable ? "pointer" : "default", // Set cursor to 'default' if not available
    opacity: isAvailable ? 1 : 0.5, // Reduce opacity if booked
    pointerEvents: isAvailable ? "auto" : "none",
  };

  return (
    <Box sx={seatStyle} onClick={handleClick}>
      <Typography variant="body2">{seatNumber}</Typography>
    </Box>
  );
};

const SeatRow = ({ rowNumber, seats, onSelectSeat }) => (
  <div key={rowNumber} style={{ display: "flex" }}>
    {seats.map((seat) => (
      <Seat
        key={seat.seatNumber}
        seatNumber={seat.seatNumber}
        isAvailable={seat.isAvailable}
        onSelect={(isSelected) =>
          onSelectSeat(rowNumber, seat.seatNumber, isSelected)
        }
      />
    ))}
  </div>
);

const TicketBookingPage = () => {
  const location = useLocation();
  const { state } = location;
  const { seatCount, price } = state;
  // const seatCount=location.state.seatCount;
  const { showId } = useParams();
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookingId, setBookingId] = useState(0);

  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  console.log(seatCount);
  console.log(price);
  const totalAmount = seatCount * price;
  useEffect(() => {
    // Fetch data for the booked seats when the component mounts
    const fetchBookedSeats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/v1/reservation/seatIds/${showId}`
        );
        const longValues = response.data;
        // const { bookedSeats } = response.data;
        const separatedValues = longValues.map((value) => {
          const stringValue = value.toString(); // Convert the number to a string
          const firstDigit = parseInt(stringValue.charAt(0), 10); // Extract the first digit
          const remainingDigits = parseInt(stringValue.slice(1), 10); // Extract the remaining digits
          return [firstDigit, remainingDigits];
        });
        console.log(separatedValues);
        // console.log(response.data);
        setBookedSeats(separatedValues);
      } catch (error) {
        console.error("Error fetching booked seats:", error);
      }
    };

    fetchBookedSeats();
  }, [showId]);
  console.log(decoded.sub); // This will log the public claims of the token

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

  const rows = Array(theatreLayout.rows)
    .fill(0)
    .map((_, rowIndex) => ({
      rowNumber: rowIndex + 1,
      seats: Array(theatreLayout.seatsPerRow)
        .fill(0)
        .map((_, seatIndex) => ({
          seatNumber: seatIndex + 1,
          isAvailable: !bookedSeats.some(
            ([row, seat]) => row === rowIndex + 1 && seat === seatIndex + 1
          ),
        })),
    }));

  // console.log(row);

  const handleProceed = async () => {
    try {
      // Define the data to be sent in the request body
      const requestData = {
        showId: `${showId}`, // Replace 'yourShowIdValue' with the actual showId value
        seatId: selectedSeats.map((seat) => `${seat.row}${seat.seatNumber}`),
        email: `${decoded.sub}`,
        totalAmount:totalAmount,
      };
      console.log({ requestData });

      // Make HTTP POST request to your backend endpoint
      const response = await axios.post(
        `http://localhost:8081/api/v1/booking/save`,
        requestData
      );

      console.log("Response from backend:", response.data);
      const bookingId = response.data;

      // Set the booking ID to the state variable
      setBookingId(bookingId);

      if (response.status >= 200 && response.status < 300) {
        // Perform navigation to payment gateway page here

        window.location.href = `/paymentgateway/${bookingId}`; // Adjust the URL as needed
        console.log(bookingId);
      }

      // Reset selected seats after successful submission
      setSelectedSeats([]);
    } catch (error) {
      console.error("Error:", error);
      alert("Seat is already booked");
      // Handle error
    }
  };

  return (
    <div>
      <Grid display={'flex'} container flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Grid sx={{  marginTop: "50px" }}>
        <h2>Theatre Seat Selection</h2>
        {rows.map((row) => (
          <SeatRow
            key={row.rowNumber}
            rowNumber={row.rowNumber}
            seats={row.seats}
            onSelectSeat={handleSelectSeat}
          />
        ))}
      </Grid>
      <Grid>
        <Typography fontSize={"18px"} margin={"30px"} color={"green"}>
          Total Amount: Rs.{totalAmount}
        </Typography>
      </Grid>
      <Grid sx={{margin:'20px'}}>
        <PaymentForm />
      </Grid>
      <Grid>
        <Button
          variant="contained"
          onClick={handleProceed}
          disabled={seatCount != selectedSeats.length}
        >
          Proceed
        </Button>
      </Grid>
      </Grid>
     
    </div>
  );
};

export default TicketBookingPage;
