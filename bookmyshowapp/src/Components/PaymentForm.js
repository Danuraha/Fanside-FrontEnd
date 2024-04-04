import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function PaymentForm({ bookedItems }) { // Receive booked items as props

  const calculateTotal = (items) => { // Function to calculate total
    // Implement your logic to calculate total price based on items array
    // (e.g., reduce function or loop)
    const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return totalPrice;
  };

  const totalAmount = calculateTotal(bookedItems); // Calculate total from props

  const [amount, setAmount] = useState(totalAmount); // Pre-fill with calculated total
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Send payment details (amount) and booked details to backend endpoint
      const response = await fetch('/api/create-payment-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, bookedItems }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment session');
      }

      const paymentSession = await response.json();

      // Redirect user to payment gateway with session data
      window.location.href = paymentSession.url;
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Amount"
        type="number"
        value={amount} // Pre-filled from booked items total
        // disabled // Disable amount editing for security
        required
      />
      <FormControl fullWidth>
        <InputLabel id="payment-method-label">Payment Method</InputLabel>
        <Select
          labelId="payment-method-label"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          required
        >
          <MenuItem value="card">Credit/Debit Card</MenuItem>
          {/* Add other payment methods as needed */}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Pay Now'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Payment successful!</p>}
    </form>
  );
}

export default PaymentForm;
