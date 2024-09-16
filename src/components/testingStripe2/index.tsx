import React from 'react';
import axios from 'axios';

const BookingForm = ({ doctorId, doctorPrice }:any) => {
  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/stripe/createCheckoutSession', {
        patientID: 'patient@example.com',  // Replace with real patientID
        doctorPrice: Math.round(doctorPrice * 100), // Price based on doctor's card
      });

      window.location.href = response.data.url;  // Redirect to Stripe Checkout
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      {/* Your booking consultation form */}
      <button onClick={handleCheckout} style={{fontSize:"28px", color:"black"}}>Proceed to Payment</button>
    </div>
  );
};

export default BookingForm;
