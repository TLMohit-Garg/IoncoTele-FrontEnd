

import React, { useState, FormEvent } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements, CardElementOptions } from '@stripe/react-stripe-js';
import axios from 'axios';
import styles from "../../Styles/testingStripe.module.css"


// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51PyXQuRpCokjQ3Hx01o9Lo3Wke6XgBla6JjgpOFAlalN3D4iuEndRJw8m2ifuXEC46IZ2hWtGveO44rmxKHfNQlJ00mF0DJqd0'); // Replace with your Publishable Key

const cardElementOptions: CardElementOptions = {
  style: {
    base: {
      fontSize: '18px', // Increase font size
      color: '#333', // Text color
      '::placeholder': {
        color: '#aaa', // Placeholder text color
      },
    },
    complete: {
      color: '#000', // Text color when field is complete
    },
    invalid: {
      color: '#fa755a', // Text color for invalid inputs
      iconColor: '#fa755a', // Icon color for invalid inputs
    },
  },
};

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState<number>(10); // Example amount in dollars
  const [clientSecret, setClientSecret] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return; // Stripe.js has not yet loaded
    const card = elements.getElement(CardElement);

    if (!card) return;

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: 'John Doe',
          },
        },
      });

      if (error) {
        alert(`Payment failed: ${error.message}`);
      } else if (paymentIntent?.status === 'succeeded') {
        alert('Payment successful!');
      }
    } catch (error) {
      alert('Payment failed');
      console.error(error);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3001/payment-booking-consultation', {
        amount: amount * 100, // Convert to cents
        currency: 'usd',
      });

      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

  return (
    <div className={styles.formcontainer}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="card-element">
          <CardElement options={cardElementOptions} />
        </div>
        <button type="button" onClick={handlePayment}>
          Initiate Payment
        </button>
        <button type="submit" disabled={!stripe || !clientSecret}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

const TestingStripe: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default TestingStripe;
