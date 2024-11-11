import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";

// Define the structure of the session object
interface Session {
  customer_email: string;
  amount_total: number;
  currency: string;
  payment_status: string;
}

const SuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null); // Define the state with the Session type
  const [error, setError] = useState("");

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get<{ session: Session }>(
          `/api/stripe/session/${sessionId}`
        );
        setSession(response.data.session);
        setLoading(false);
      } catch (error) {
        setError("Unable to retrieve session details.");
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1">
        Thank you for your payment. An email receipt has been sent to{" "}
        {session?.customer_email}.
      </Typography>
      {/* You can display more details about the session here */}
      <Typography variant="body2">
        Payment Status: {session?.payment_status}
      </Typography>
      {/* <Typography variant="body2">
        Total Amount: {session?.amount_total / 100} {session?.currency.toUpperCase()}
      </Typography> */}
    </Box>
  );
};

export default SuccessPage;
