import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

function PaymentGateway() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [seatIds, setSeatIds] = useState([]);
  const { bookingId } = useParams();

  useEffect(() => {
    fetchBooking();
    fetchSeatIds();
  }, []);

  const fetchBooking = async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log(token);
      const response = await axios.get(
        `http://localhost:8081/api/v1/booking/${bookingId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },}
      );
      setBookingDetails(response.data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const fetchSeatIds = async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log(token);
      const response = await axios.get(
        `http://localhost:8081/api/v1/reservation/getseat/${bookingId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },}
      );
      setSeatIds(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching seat IDs:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ width: "700px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <Typography variant="h5" gutterBottom fontWeight={"bold"} style={{ color: '#13eb37' }}>
            Payment Successful.
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          display={"flex"}
          sx={{ backgroundColor: "#f7e7e6" }}
          container
          flexDirection={"column"}
        >
          {bookingDetails && (
            <List>
              <Grid>
                <ListItem>
                  <ListItemText
                    primary={`Movie Title: ${bookingDetails.showtime.movie.title}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Cinema Name: ${bookingDetails.showtime.cinema.name}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Cinema Location:${bookingDetails.showtime.cinema.location}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Start Time: ${bookingDetails.showtime.startTime}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`End Time:${bookingDetails.showtime.endTime}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Show Date:${bookingDetails.showtime.showdate}`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={`User First Name:${bookingDetails.user.firstName}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`User Last Name:${bookingDetails.user.lastName}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Total Amount:${bookingDetails.totalAmount}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Seat IDs: ${seatIds.join(", ")}`}
                  />
                </ListItem>
              </Grid>
            </List>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default PaymentGateway;
