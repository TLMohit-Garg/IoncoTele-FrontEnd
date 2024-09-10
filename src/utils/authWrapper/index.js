import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// interface DecodedToken {
//   exp: any;
// }

const AuthWrapper= () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        // No token found, redirect to login page
        window.location.href = '/about';
        return;
      }

      // Function to check if the token is expired
      const isTokenExpired = (token) => {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          const currentTime = Date.now() / 1000; // Convert to seconds
          return decoded.exp < currentTime;
        } catch (error) {
          // Handle decoding error (invalid token format)
          console.error('Error decoding token:', error);
          return true; // Consider token expired if decoding fails
        }
      };

      if (isTokenExpired(token)) {
        // Token is expired
        localStorage.removeItem('token'); // Optionally clear the token
        alert('Session expired. Please log in again.');
        window.location.href = '/about'; // Redirect to login page
        return;
      }

      try {
        // Token is still valid, proceed with the API request
        const response = await axios.get('/api/protected-route', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data.message);
      } catch (err) {
        setError('Error accessing protected route');
        console.error('Error accessing protected route:', err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data && <p>{data}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AuthWrapper;
