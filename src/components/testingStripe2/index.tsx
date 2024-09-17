import React from 'react';
import axios from 'axios';

const BookingForm = ({ patientEmail, doctorPrice }:any) => {
  const [currency, setCurrency] = React.useState('gbp');
  const [error, setError] = React.useState('');

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/stripe/createCheckoutSession', {
        patientEmail: patientEmail,  // Replace with real patientID
        doctorPrice: Math.round(doctorPrice * 10), // Price based on doctor's card
        preferredCurrency: currency,  // Selected currency
      });

      window.location.href = response.data.url;  // Redirect to Stripe Checkout
    } catch (error: any) {
      console.error('Error during checkout:' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div>
        <select
        value={currency}
        onChange={(e) => {
          setCurrency(e.target.value);
          console.log('Selected currency:', e.target.value); // Log the selected currency here
        }}
      >
        <option value="usd">USD</option>
        <option value="eur">Euro</option>
        <option value="gbp">Pound</option>
        <option value="inr">INR</option>
        <option value="aud">aud</option>
        <option value="cad">cad</option>
        <option value="jpy">jpy</option>
      </select>
      {/* Your booking consultation form */}
      <button onClick={handleCheckout} style={{fontSize:"28px", color:"black"}}>Proceed to Payment</button>
    </div>
  );
};

export default BookingForm;
