import React from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Load your Stripe publishable key
const stripePromise = loadStripe(
  "pk_live_51Q3bltA8kzNiYMNTljp2tSqfgkoWuM2Fi667Xdlvts1JABnvKnzvh1795SBDnMZAIn3yUZlB0Kkl0VbxrmViVSgh007yj5Qtay"
); 

const BookingForm = ({ patientEmail, doctorPrice, doctorName }: any) => {
  const [currency, setCurrency] = React.useState("gbp");
  const [error, setError] = React.useState("");

  const increasedPrice = doctorPrice * 1.15;

  const handleCheckout = async () => {
    console.log("Initiating checkout with the following details:");
    console.log("Patient Email:", patientEmail);
    console.log("Doctor's Price (increased):", increasedPrice);
    console.log("Selected Currency:", currency);
    console.log("Selected Currency:", doctorPrice);
    try {
      const response = await axios.post("/api/stripe/createCheckoutSession", {
        patientEmail: patientEmail, // Replace with real patientID
        doctorPrice: increasedPrice, // Price based on doctor's card
        preferredCurrency: currency, // Selected currency
        doctorName: doctorName,
      });
      const { url, sessionId } = response.data;

      console.log("Stripe Checkout Session created successfully:", response.data);

      // Redirect to Stripe Checkout
      if (url) {
      window.location.href = url; 
      }

      // Redirect to the Stripe Checkout session
      const stripe = await stripePromise;
      if (stripe) {
        const result = await stripe.redirectToCheckout({ sessionId });
        if (result.error) {
          console.error("Stripe Checkout redirection error:", result.error.message);
        }
      }
    
    } catch (error: any) {
      console.error(
        "Error during checkout:" +
          (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div>
      <select
        value={currency}
        onChange={(e) => {
          setCurrency(e.target.value);
          console.log("Selected currency:", e.target.value); // Log the selected currency here
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
      <button
        onClick={handleCheckout}
        style={{
          fontSize: "18px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Proceed to Payment
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default BookingForm;
