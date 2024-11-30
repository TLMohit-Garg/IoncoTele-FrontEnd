import React from "react";
import { Grid } from "@mui/material";

function RefundPolicy() {
  return (
    <>
      <Grid sx={{ paddingLeft: "12px", fontWeight: "bold" }}>RefundPolicy</Grid>
      <Grid
        container
        mt={3}
        mb={3}
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          textAlignLast: "center",
          textAlign: "center",
        }}
      >
        Cancellation and Refund Policy This policy is applicable to
        teleconsultation service only. Ioncology Solutions Ltd is committed to
        providing quality teleconsultation services to our clients. We
        understand that plans may change, and we strive to offer a fair
        cancellation and refund policy. Amend Appointment: The client needs to
        contact Ioncology Solutions by email at info@ioncosolutions.com to amend
        appointment with the selected doctor. Cancellation Policy: 1.
        Cancellation Window: Clients may cancel their booked teleconsultation
        appointment up to 48 hours before the scheduled appointment time. 2.
        Cancellation Charges: A cancellation fee of 25% of the consultation fee
        applies to cover costs related to currency conversion and bank handling
        charges. This charge will be deducted from the total fee paid at the
        time of booking. Refund Policy: 1. Refund Amount: Clients who cancel
        their teleconsultation appointment at least 48 hours in advance will be
        eligible to receive a 75% refund of the total amount paid. 2. Refund
        Processing Time: Refunds will be processed within 14 days from the date
        of the cancellation confirmation. Contact Information: For cancellation
        requests or any questions regarding this policy, please contact
        Ioncology Solutions Ltd at info@ioncosolutions.com. By scheduling a
        teleconsultation, clients agree to the terms outlined in this
        Cancellation and Refund Policy.
      </Grid>
    </>
  );
}

export default RefundPolicy;
