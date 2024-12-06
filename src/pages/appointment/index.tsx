import UserCard from '../../components/appointmentCards'
import { Grid } from '@mui/material'

function Appointments() {
  return (
    <>
    <div> My Appointments Page </div>
    <Grid container item xl={10} lg={10} md={10} sm={12} ml={3} mt={3}>
    <UserCard />
    </Grid>
    </>
  )
}

export default Appointments


