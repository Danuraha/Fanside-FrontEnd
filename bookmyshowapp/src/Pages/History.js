import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect ,useState} from'react';

const History = () => {
    const [history, setHistory] = useState([]);
    useEffect(() => {
        fetchHistory();
       
      }, []);
    
      const fetchHistory = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const decoded=jwtDecode(token);
          console.log(token);
          const response = await axios.get(
            `http://localhost:8081/api/v1/booking/getbyemail/${decoded.sub}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },}
          );
          setHistory(response.data);
        } catch (error) {
          console.error("Error fetching booking details:", error);
        }
      };
    

  return (
    <div>
        <Typography fontSize={'24px'} textAlign={'center'} marginTop={'20px'}>History of Booking</Typography>
      {history.map((booking) => (
        <Card key={booking.bookingId} sx={{ maxWidth: 600, margin: 'auto', padding: 3 ,marginTop:'80px',marginBottom:'40px',backgroundColor:'#f2c9dd'}}>
          <CardContent>
            <Typography variant="h6">Booking ID: {booking.bookingId}</Typography>
            <Typography variant="body1">Movie: {booking.showtime.movie.title}</Typography>
            <Typography variant="body2">Cinema: {booking.showtime.cinema.name}</Typography>
            <Typography variant="body2">Showtime: {booking.showtime.startTime} - {booking.showtime.endTime}</Typography>
            <Typography variant="body2">Date: {booking.showtime.showdate}</Typography>
            <Typography variant="body2">Total Amount: {booking.totalAmount}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default History;
