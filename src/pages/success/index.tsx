// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSearchParams } from "react-router-dom";
// import { Box, Typography, CircularProgress } from "@mui/material";

// // Define the structure of the session object
// interface Session {
//   customer_email: string;
//   amount_total: number;
//   currency: string;
//   payment_status: string;
// }

// const SuccessPage: React.FC = () => {
//   const [searchParams] = useSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [session, setSession] = useState<Session | null>(null); // Define the state with the Session type
//   const [error, setError] = useState("");

//   const sessionId = searchParams.get("session_id");

//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const response = await axios.get<{ session: Session }>(
//           `/api/stripe/session/${sessionId}`
//         );
//         setSession(response.data.session);
//         // Trigger email notification on successful payment
//         if (response.data.session.payment_status === "paid") {
//           await axios.post("/api/send-payment-email", {
//             email: response.data.session.customer_email,
//             sessionId,
//             amount: response.data.session.amount_total / 100,
//             currency: response.data.session.currency,
//           });
//         }

//         setLoading(false);

//       } catch (error) {
//         setError("Unable to retrieve session details.");
//         setLoading(false);
//       }
//     };

//     if (sessionId) {
//       fetchSession();
//     }
//   }, [sessionId]);

//   if (loading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <Typography color="error">{error}</Typography>;
//   }

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       justifyContent="center"
//       minHeight="100vh"
//     >
//       <Typography variant="h4" gutterBottom>
//         Payment Successful!
//       </Typography>
//       <Typography variant="body1">
//         Thank you for your payment. An email receipt has been sent to{" "}
//         {session?.customer_email}.
//       </Typography>
//       {/* You can display more details about the session here */}
//       <Typography variant="body2">
//         Payment Status: {session?.payment_status}
//       </Typography>
//       {/* <Typography variant="body2">
//         Total Amount: {session?.amount_total / 100} {session?.currency.toUpperCase()}
//       </Typography> */}
//     </Box>
//   );
// };

// export default SuccessPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';

interface SessionData {
  bookingDetails?: {
    email?: string;
    doctorId?: {
      charges?: number;
      preferredCurrency?: string;
    };
    fullName?: string;
    prefferDate?: string;
  };
}

const SuccessPage: React.FC = () => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const sessionId = new URLSearchParams(window.location.search).get('session_id');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');
    if (!sessionId) {
      console.error('Session ID is missing in the URL');
      setError('Session ID is missing in the URL.');
      return;
    } else {
      console.log('Fetched session_id:', sessionId);
    }

    const fetchSession = async () => {
      try {
        // const { data } = await axios.get<SessionData>(`/api/stripe/session/${sessionId}`);
        const { data } = await axios.get<SessionData>(`/api/tempBookingConsultation/stripe/session/${sessionId}`);
        setSessionData(data);
        console.log("user payment details here",data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching session:', err);
        setError('Failed to load session details.');
        setLoading(false);
      }
    };
      fetchSession();
    // if (sessionId) fetchSession();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h4" gutterBottom>
        Payment Successfull!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for your payment. An email receipt has been sent to
        {/* <strong>{sessionData?.customer_email}</strong>. */}
        <strong>{sessionData?.bookingDetails?.email}</strong>.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Patient Name: <strong>{sessionData?.bookingDetails?.fullName}</strong>
      </Typography>
      <Typography variant="body2" gutterBottom>
        Consultation Date: <strong>{sessionData?.bookingDetails?.prefferDate}</strong>
      </Typography>
      <Typography variant="body2" gutterBottom>
        {/* Payment Status: <strong>{sessionData?.payment_status}</strong> */}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Amount Paid: <strong>{sessionData?.bookingDetails?.doctorId?.charges} {sessionData?.bookingDetails?.doctorId?.preferredCurrency}</strong>
      </Typography>
    </Box>
  );
};

export default SuccessPage;

