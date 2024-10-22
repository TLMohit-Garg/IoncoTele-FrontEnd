import React from 'react'
import UserCard from '../../components/appointmentCards'
import { Grid } from '@mui/material'

function Appointments() {
  return (
    <>
    <div> My Appointments Page</div>
    <Grid container item xl={10} lg={10} md={10} sm={12} ml={3} mt={3}>
    <UserCard consultationId="67179c9a2bef0f564170d6a4"/>
    </Grid>
    <div> Previous Appointments </div>
    <Grid container item xl={10} lg={10} md={10} sm={12} ml={3} mt={2}>
    <UserCard/>
    </Grid>
    
    </>
  )
}

export default Appointments


