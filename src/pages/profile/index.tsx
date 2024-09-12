import React from 'react'
import PatientProfile from '../../components/patientProfile'
import DoctorProfile from '../../components/doctorProfile'
import { useSelector } from 'react-redux';
import { selectIsDoctorAuthenticated } from '../../store/authDoctorSlice';
import { selectIsPatientAuthenticated } from '../../store/authPatientSlice';


function Profile() {
  const isDoctorAuthenticated = useSelector(selectIsDoctorAuthenticated);
  const isPatientAuthenticated = useSelector(selectIsPatientAuthenticated);
  return (
    <>
    {isDoctorAuthenticated ? (
        <DoctorProfile />
      ) : isPatientAuthenticated ? (
        <PatientProfile />
      ) : (
        <p>Please log in to access your profile.</p>
      )}
    </>

  )
}

export default Profile