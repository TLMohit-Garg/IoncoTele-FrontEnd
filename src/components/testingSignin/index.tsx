import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Toast } from '../ToastMessage'; // Your reusable Toast component

const SignInForm = () => {
  const { register, handleSubmit } = useForm();

  const handleSignIn = async (data: any) => {
    try {
      // Make a POST request to the sign-in endpoint
      const response = await axios.post('/api/signin', data);

      // If sign-in is successful
      if (response.status === 200) {
        Toast('success', 'Sign-in successful!');
        // Handle post sign-in logic (e.g., redirect to dashboard)
      } else {
        Toast('error', 'Sign-in failed!');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      Toast('error', 'An error occurred during sign-in!');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <input type="email" placeholder="Email" {...register('email')} required />
      <input type="password" placeholder="Password" {...register('password')} required />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
