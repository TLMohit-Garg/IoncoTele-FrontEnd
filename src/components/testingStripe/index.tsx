import React, { useState, FormEvent } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  CardElementProps,
} from "@stripe/react-stripe-js";
import axios from "axios";
import styles from "../../Styles/testingStripe.module.css";
import { Grid } from "@mui/material";

// Load your Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51PyXQuRpCokjQ3Hx01o9Lo3Wke6XgBla6JjgpOFAlalN3D4iuEndRJw8m2ifuXEC46IZ2hWtGveO44rmxKHfNQlJ00mF0DJqd0"
); // Replace with your Publishable Key

const cardElementOptions: CardElementProps["options"] = {
  style: {
    base: {
      fontSize: "18px", // Increase font size
      color: "black", // Text color
      "::placeholder": {
        color: "green", // Placeholder text color
      },
      padding: "10px 12px",
    },
    complete: {
      color: "blue", // Text color when field is complete
    },
    invalid: {
      color: "violet", // Text color for invalid inputs
      iconColor: "#fa755a", // Icon color for invalid inputs
    },
  },
};

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState<number>(10); // Example amount in dollars
  const [clientSecret, setClientSecret] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return; // Stripe.js has not yet loaded
    const card = elements.getElement(CardElement);

    if (!card) return;

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: "John Doe",
            },
          },
        }
      );

      if (error) {
        alert(`Payment failed: ${error.message}`);
      } else if (paymentIntent?.status === "succeeded") {
        alert("Payment successful!");
      }
    } catch (error) {
      alert("Payment failed");
      console.error(error);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post("/api/paymentBookingConsultation", {
        amount: amount * 100, // Convert to cents
        currency: "usd",
      });

      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  return (
    <Grid className={styles.formcontainer}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <Grid className="cardElement" style={{ width: "200%", height: "100%" }}>
          <CardElement options={cardElementOptions} />
        </Grid>
        <button
          type="button"
          onClick={handlePayment}
          style={{ background: "red", margin: "10px" }}
        >
          Initiate Payment
        </button>
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          style={{ margin: "10px" }}
        >
          Pay Now
        </button>
      </form>
    </Grid>
  );
};

const TestingStripe: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default TestingStripe;
