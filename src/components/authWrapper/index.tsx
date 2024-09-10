import React, { useEffect, useState } from "react";
// import * as jwt_decode from 'jwt-decode';
import JwtDecode from "../../utils/jwtDecode";
import axios from "axios";

// interface DecodedToken {
//   exp: number;
// }

const AuthWrapper: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // No token found, redirect to login page
      window.location.href = "/about";
      return;
    }

    // Function to check if the token is expired
    const isTokenExpired = (token: string) => {
      try {
        const decoded: any = JwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        const expired = decoded.exp < currentTime;
        if (expired) {
          console.log("Token has expired.");
        }
        return expired;
        // return decoded.exp < currentTime;
      } catch (error) {
        // Handle errors (e.g., invalid token format)
        console.error("Token decoding failed:", error);
        return true;
      }
    };

    if (isTokenExpired(token)) {
      // Token is expired
      localStorage.removeItem("token"); // Optionally clear the token
      alert("Session expired. Please log in again.");
      console.log("Session expired. Please log in again.");
      window.location.href = "/about"; // Redirect to login page
      return;
    }

    try {
      // Token is still valid, proceed with the API request
      const response = await axios.get("/api/protected-route", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data.message);
    } catch (err: any) {
      setError("Error accessing protected route");
      console.error(
        "Error accessing protected route:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {data && <p>{data}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AuthWrapper;
